import {  containerProductos } from "../config/storage";
import sql from "mssql";

interface Props {
    archivos: Array<Express.Multer.File>;
    imagenesDB: Array<{
        id_imagen: number;
        nombre_archivo: string;
        orden: number;
        principal: boolean;
    }>;
    id_producto: string;
    slotsParseados: String[];
    transaction: sql.Transaction;
}

export const procesamientoImagenes = async({archivos, imagenesDB, slotsParseados, id_producto, transaction}: Props) => {
    try {
        let indexArchivo = 0;

        // Recorremos los 3 slots recibidos desde el frontend (indices 0, 1, 2)
        for(let i = 0; i < slotsParseados.length; i++){
            const slot = slotsParseados[i];


            //Buscamos si aya existe un registro guardao en la base de datos
            const imagenAnterior = imagenesDB.find((img: any) => img.orden === i);
            const principal = i === 0 ? 1 : 0;

            if(slot === 'NUEVA'){
                //A.  si habia una imagen previa en este slot, la borramos de Azure

                if(imagenAnterior && imagenAnterior.nombre_archivo){
                    try {
                        const nombreArchivoViejo = imagenAnterior.nombre_archivo.split('/').pop();

                        if(nombreArchivoViejo){
                            const blockBlobClienteViejo = containerProductos.getBlockBlobClient(nombreArchivoViejo);
                            await blockBlobClienteViejo.deleteIfExists();
                        }
                    } catch (error) {
                        console.error('Error al borrar imagen vieja de Azure: ', error)
                    };
                };


                //B. Subimos el nuevo archivo Correspondiente
                const archivo = archivos[indexArchivo];
                if(archivo){
                    const extension = archivo.originalname.split('.').pop();
                    const nombreArchivo = `${Date.now()}_${i}.${extension}`;
                    const blockBlobCliente = containerProductos.getBlockBlobClient(nombreArchivo);

                    await blockBlobCliente.uploadData(archivo.buffer, {
                        blobHTTPHeaders: {blobContentType: archivo.mimetype}
                    });

                    const nuevaUrl = blockBlobCliente.url;
                    indexArchivo++;

                    //C. Si la fila ya existia en la db, la actualizamos. Si no, insertamos una fila
                    const requestUpsert = new sql.Request(transaction);
                    requestUpsert.input('id_producto', Number(id_producto));
                    requestUpsert.input('nombre_archivo', nuevaUrl);
                    requestUpsert.input('orden', i);
                    

                    if(imagenAnterior){
                        requestUpsert.input('id_imagen', imagenAnterior.id_imagen);
                        await requestUpsert.query(`
                            UPDATE productos_imagenes
                            SET nombre_archivo = @nombre_archivo
                            WHERE id_imagen = @id_imagen`)
                    }else{
                        await requestUpsert.query(`
                            INSERT INTO productos_imagenes (id_producto, nombre_archivo, orden)
                            VALUES (@id_producto, @nombre_archivo, @orden)`)
                    };
                }
            } else if (slot === 'VACIA'){
                //Si el slot viene como 'VACIA', y existia un registro, borramos la imagen en Azure y la fila en la base de datos
                if(imagenAnterior){

                    if(imagenAnterior.nombre_archivo){
                        try {
                            const nombreArchivoViejo = imagenAnterior.nombre_archivo.split('/').pop();
                            if(nombreArchivoViejo){
                                const blockBlobClienteViejo = containerProductos.getBlockBlobClient(nombreArchivoViejo);
                                await blockBlobClienteViejo.deleteIfExists();
                            }
                        } catch (error) {
                            console.error('Error al borrar imagen vieja de Azure: ', error);
                        }
                    }

                    const requestDelete = new sql.Request(transaction);
                    requestDelete.input('id_imagen', imagenAnterior.id_imagen);
                    await requestDelete.query(`
                        DELETE FROM productos_imagenes
                        WHERE id_imagen = @id_imagen
                    `);
                }
            }
        }
        
        
    } catch (error) {
        console.error(error);
        throw new Error("Error al procesar imagenes");
    }
}