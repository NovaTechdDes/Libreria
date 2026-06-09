import fs from 'fs'
import path from 'path'
import { getProductosPorRubro } from '../repositories/productos.repository';
import { obtenerRubros } from './rubro.service';
import { supabase } from '../utils/supabase';
import mime from "mime-types";
import pLimit from "p-limit";


const carpeta = "./uploads";


const rubrosSync = process.env.RUBROS?.split(",") || [];
const rubrosSyncLower = rubrosSync.map((r) => r.toLowerCase().trim());

export const obtenerImagenesDelStorage = async () => {
    const { data, error } = await supabase.storage.from('productos').list("productos", {limit: 10000});

    if(error){
        console.error("Error al obtener imagenes del storage", error);
        return [];
    }
    return data;
}

export const syncImages = async () => {
    try {
        const archivos = await fs.promises.readdir(carpeta);
        const archivosStorage = await obtenerImagenesDelStorage()

        const imagenesExistentes = new Set(
            archivosStorage.map((archivo) => archivo.name)
        )

        const mapImagenes = new Map();

    for(const archivo of archivos){
        const codigo =  path.parse(archivo).name;

        mapImagenes.set(codigo, archivo)
    }

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
                    const resultado = await subirImagen(producto.codigo, `./uploads/${imagen}`);
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

export const subirImagen = async (codigo: string, rutaArchivo: string) => {
    try {
        const buffer = await fs.promises.readFile(rutaArchivo);
        const extension = path.extname(rutaArchivo);
        const nombreArchivo = `${codigo}${extension}`;


        const contentType =
            mime.lookup(rutaArchivo) || "application/octet-stream";

        const { error } = await supabase.storage.from('productos/productos').upload(nombreArchivo, buffer, {
            upsert: true,
            contentType
        })

        if(error){
            throw error
        }

        return nombreArchivo
    } catch (error) {
        console.error(error);
        return null
    }
};

