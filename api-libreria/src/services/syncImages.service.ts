import fs from 'fs'
import path from 'path'
import { getProductosPorRubro } from '../repositories/productos.repository';
import { obtenerRubros } from './rubro.service';
import mime from "mime-types";
import pLimit from "p-limit";
import { containerProductos } from '../config/storage';
import { BlockBlobClient } from '@azure/storage-blob';
import sql from 'mssql';
import { pool, poolAzure, poolConnectAzure } from '../config/db';

const carpeta = "./uploads";

const rubrosSync = process.env.RUBROS?.split(",") || [];
const rubrosSyncLower = rubrosSync.map((r) => r.toLowerCase().trim());



export const obtenerImagenesDelStorage = async () => {

    try {
        const archivos = [];

        for await (const blob of containerProductos.listBlobsFlat()) {
            archivos.push({name: blob.name})
        };
        return archivos
        
    } catch (error) {
        console.error("error al obtener imagenes del storage", error);
        return [];
    }
}

export const syncImages = async () => {
    try {
        await poolConnectAzure;
        const archivos = await fs.promises.readdir(carpeta);
        const archivosStorage = await obtenerImagenesDelStorage()

        const imagenesExistentes = new Set(
            archivosStorage.map((archivo) => archivo.name)
        )

        const mapImagenes = new Map();



    for(const archivo of archivos){
        const codigo =  path.parse(archivo).name;

        mapImagenes.set(codigo, archivo)
    };

   //Obtenemos los rubros
    const rubros = await obtenerRubros();

    const parentIds = rubros.rubros
      .filter((r) =>
        rubrosSyncLower.includes(r.nom_rubro_g.toLowerCase().trim()),
      )
      .map((r) => r.id_rubro_g);


    // 3. Filtrar los Sub Rubros que pertenezcan a esos parentIds y obtener sus id_rubro (IDs finales)
    const subRubrosIds: number[] = rubros.subrubros
      .filter((sub) => parentIds.includes(sub.id_rubro_g))
      .map((sub) => sub.id_rubro);

    const productos = await getProductosPorRubro(subRubrosIds);

        const productosParaSubir = productos.filter((producto) => {
            const imagen = mapImagenes.get(producto.codigo);
            return imagen && !imagenesExistentes.has(imagen);
        });

        console.log(`[syncImages] Imágenes a subir: ${productosParaSubir.length} / ${productos.length} productos`);

        const limit = pLimit(5);
        let subidas = 0;
        let fallidas = 0;

        await Promise.all(
            productosParaSubir.map((producto) =>
                limit(async () => {
                    const imagen = mapImagenes.get(producto.codigo)!;
                    const resultado = await subirImagen(producto.codigo, producto.id_articulo, `./uploads/${imagen}`);
                    if (resultado) {
                        subidas++;
                    } else {
                        fallidas++;
                    }
                })
            )
        );

        console.log(`[syncImages] Completado — subidas: ${subidas}, fallidas: ${fallidas}`);
    } catch (error) {
     console.error("error sincronizando imagenes: ", error);
    }
};

export const subirImagen = async (codigo: string, idInterno: number, rutaArchivo: string) => {
    let blockBlobCliente : BlockBlobClient | null = null;

    const transaction = new sql.Transaction(poolAzure);
    
    try {
        await transaction.begin();

        const buffer = await fs.promises.readFile(rutaArchivo);
        const extension = path.extname(rutaArchivo);
        const nombreArchivo = `${codigo}${extension}`;

        const contentType = mime.lookup(rutaArchivo) || "application/octet-stream";
        blockBlobCliente = containerProductos.getBlockBlobClient(nombreArchivo);

        await blockBlobCliente.uploadData(buffer, {
            blobHTTPHeaders: {
                blobContentType: contentType,
            },
        });

        const request = new sql.Request(transaction);
        request.input('imagen', sql.VarChar, blockBlobCliente.url);
        request.input('id_interno', sql.Int, idInterno);
        
       const query = `
       IF NOT EXISTS (
        SELECT 1 FROM productos_imagenes
        WHERE id_producto = (SELECT id_producto FROM productos WHERE id_interno = @id_interno)
         AND nombre_archivo = @imagen
       )
        BEGIN
            INSERT INTO productos_imagenes (id_producto, nombre_archivo, orden)
            VALUES ((SELECT id_producto FROM productos WHERE id_interno = @id_interno), @imagen, 1)
        END 
        `;

        await request.query(query);
        await transaction.commit();
        return nombreArchivo;
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        return null;
    }
};

