import { Request, Response } from "express";
import { poolPromise } from "../config/db";
import sql from "mssql";
import { containerClient } from "../config/storage";
import { BlockBlobClient } from "@azure/storage-blob";


export const getBanners = async(req: Request, res: Response) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request().query(`
            SELECT * FROM banners 
        `)
        

        res.status(200).json({
            ok: true,
            banners: result.recordset
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener banners'
        })
    }
};

export const postBanner = async(req: Request, res: Response) => {
    const archivo = req.file;
    const { titulo, subtitulo, activo, orden } = req.body;

    if(!archivo){
        return res.status(400).json({
            ok: false,
            mensage: 'El archivo es obligatorio'
        })
    }
    const pool = await poolPromise;
    const transaction = new sql.Transaction(pool);
    let archivoSubido = false;
    let blockBlobCliente: BlockBlobClient | null = null;
    try {        
        await transaction.begin();

        const extension = archivo?.originalname.split('.').pop();
        const nombreArchivo = `${Date.now()}.${extension}`;
        blockBlobCliente = containerClient.getBlockBlobClient(nombreArchivo);

        await blockBlobCliente.uploadData(archivo.buffer, {
            blobHTTPHeaders: {
                blobContentType: archivo.mimetype
            }
        });
        archivoSubido = true;

        const requestInsert = new sql.Request(transaction);
        let queryInsertBanner = `INSERT INTO banners
            (titulo, subtitulo, activo, imagen_url, orden)
            VALUES (@titulo, @subtitulo, @activo, @imagen_url, @orden)`

        requestInsert.input('titulo', titulo)
        requestInsert.input('subtitulo', subtitulo)
        requestInsert.input('activo', activo)
        requestInsert.input('imagen_url', blockBlobCliente.url)
        requestInsert.input('orden', orden)

        await requestInsert.query(queryInsertBanner);

        await transaction.commit();

        res.status(201).json({
            ok: true,
            msg: 'Banner creado'
        })

    } catch (error) {
        try {
            await transaction.rollback();
        } catch (rollbackError) {
            console.error('Error al hacer rollback (posiblemente la transacción no había iniciado):', rollbackError);
        }

        if(archivoSubido && blockBlobCliente){
            try {
                await blockBlobCliente.deleteIfExists();
            } catch (deleteError) {
                console.error('Error al eliminar archivo tras fallo:', deleteError);
            }
        }

        console.error('Error original:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al crear banner'
        })
    }
};

export const putBanner = async(req: Request, res: Response) => {
    const archivo = req.file;
    const {id} = req.params;
    const { titulo,  subtitulo, activo, orden } = req.body;

    const pool = await poolPromise;
    const transaction = new sql.Transaction(pool);
    let archivoSubido = false;
    let blockBlobCliente: BlockBlobClient | null = null;
    let urlImagenVieja: string | null = null;

    try {
        await transaction.begin();
        // Eliminar imagen si existe
        if(archivo){
             const requestSelect = new sql.Request(transaction);
            const bannerResult = await requestSelect
                .input('id', id)
                .query(`SELECT imagen_url FROM banners WHERE id = @id`);
            const banner = bannerResult.recordset[0];
            if (banner && banner.imagen_url) {
                urlImagenVieja = banner.imagen_url;
            }
        
         const extension = archivo?.originalname.split('.').pop();
         const nombreArchivo = `${Date.now()}.${extension}`;
         blockBlobCliente = containerClient.getBlockBlobClient(nombreArchivo);

         await blockBlobCliente.uploadData(archivo.buffer, {
            blobHTTPHeaders: {
                blobContentType: archivo.mimetype
            }
         })

         archivoSubido = true;
        }        
        
        // Acualizar banner con nueva imagen
            const requestUpdate = new sql.Request(transaction);
            let queryUpdate = `UPDATE banners SET 
                titulo = @titulo,
                subtitulo = @subtitulo,
                activo = @activo,
                orden = @orden
            `;

            if(archivoSubido){
                queryUpdate += `, imagen_url = @imagen_url `
            }

            queryUpdate += ` WHERE id = @id; SELECT * FROM banners WHERE id = @id; `

            if(archivoSubido){
                requestUpdate.input('imagen_url', blockBlobCliente!.url);
            }

            requestUpdate.input('id', id)
            requestUpdate.input('titulo', titulo)
            requestUpdate.input('subtitulo', subtitulo)
            requestUpdate.input('activo', activo)
            requestUpdate.input('orden', orden)

            const result = await requestUpdate.query(queryUpdate);

            await transaction.commit();

            if (urlImagenVieja) {
            try {
                const nombreArchivoViejo = urlImagenVieja.split('/').pop();
                if (nombreArchivoViejo) {
                    const blockBlobClienteViejo = containerClient.getBlockBlobClient(nombreArchivoViejo);
                    await blockBlobClienteViejo.deleteIfExists();
                }
            } catch (storageError) {
                // No detenemos la respuesta del cliente, solo registramos el error
                console.error('Error al eliminar la imagen anterior de Azure Storage:', storageError);
            }
        }


            res.status(200).json({
                ok: true,
                banner: result.recordset[0]
            })
        } catch (error) {
            try {
                await transaction.rollback();
            } catch (rollbackError) {
                console.error('Error al hacer rollback (posiblemente la transacción no había iniciado):', rollbackError);
            }

            if(archivoSubido && blockBlobCliente){
                try {
                    await blockBlobCliente.deleteIfExists();
                } catch (deleteError) {
                    console.error('Error al eliminar archivo nuevo tras fallo:', deleteError);
                }
            }
            console.error('Error original:', error);
            res.status(500).json({
                ok: false,
                msg: 'Error al actualizar banner'
            });
    }
};

export const deleteBanner = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if(!id){
            return res.status(400).json({
                ok: false,
                mensage: 'El id es obligatorio'
            });
        };

        const pool = await poolPromise;

        // 1. Obtener la informacion del banner para saber la url de la imagen
        const bannerResult = await pool.request()
            .input('id', id)
            .query(`SELECT imagen_url FROM banners WHERE id = @id`);

        const banner = bannerResult.recordset[0];

        if(!banner){
            return res.status(404).json({
                ok: false,
                msg: 'El banner no existe'
            })
        };

        // 2. Eliminar el registor en la base de datos

        await pool.request()
            .input('id',id)
            .query(`
                DELETE FROM banners WHERE id = @id
            `)
        
        // 3. si la eliminacion en BD fue exitosa,  borrar la imagen de azure storage
        if(banner.imagen_url){
            try {
                const nombreArchivo = banner.imagen_url.split('/').pop();
                if(nombreArchivo){
                    const blockBlobCliente = containerClient.getBlockBlobClient(nombreArchivo);
                    await blockBlobCliente.deleteIfExists();
                }
            } catch (storageError) {
                console.error('Error al eliminar el archivo de Azure Storae:', storageError)
            }
        }

        res.status(200).json({
            ok: true,
            msg: 'Banner eliminado'
        })
    } catch (error) {
                console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al eliminar banner'
        })
    }
};

export const putStatusBanner = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { activo } = req.body;


        if(!id) {
            return res.status(400).json({
                ok: false,
                mensage: 'El id es obligatorio'
            });
        };

        const pool = await poolPromise;

        await pool.request()
            .input('id', id)
            .input('activo', activo)
            .query(`
                UPDATE banners SET activo = @activo WHERE id = @id 
            `);

        res.status(200).json({
            ok: true,
            msg: 'Banner actualizado'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al actualizar banner'
        })
    }
};