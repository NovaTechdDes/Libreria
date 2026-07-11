import { Request, Response } from "express";
import { poolPromise } from "../config/db"

export const getBanners = async(req: Request, res: Response) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request().query(`
            SELECT * FROM banners WHERE activo = 1    
        `)
        

        res.status(200).json({
            ok: true,
            banners: result.recordset
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener banners'
        })
    }
};

export const postBanner = async(req: Request, res: Response) => {
    try {
        
    } catch (error) {
        
    }
};

export const putBanner = async(req: Request, res: Response) => {
    try {
        const { id } = req.query;
        const { titulo, subtitulo, activo, imagen_url} = req.body;

        if(!id) {
            return res.status(400).json({
                ok: false,
                mensage: 'El id es obligatorio'
            });
        };

        const pool = await poolPromise;
        
        // Eliminar imagen si existe
        
        // Cargar nueva imagen
        
        // Acualizar banner con nueva imagen
            const result = await pool.request()
                .input('id', id)
                .input('titulo', titulo)
                .input('subtitulo', subtitulo)
                .input('activo', activo)
                .input('imagen_url', imagen_url)
                .query(`
                        UPDATE banners SET
                            titulo = @titulo,
                            subtitulo = @subtitulo, 
                            activo = @activo, 
                            imagen_url = @imagen_url 
                        WHERE id = @id

                        SELECT * FROM banners WHERE id = @id
            `)

        res.status(200).json({
            ok: true,
            banner: result.recordset[0]
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar banner'
        });
    }
};

export const deleteBanner = async(req: Request, res: Response) => {
    try {
        const { id } = req.query;

        if(!id){
            return res.status(400).json({
                ok: false,
                mensage: 'El id es obligatorio'
            });
        };

        const pool = await poolPromise;

        await pool.request()
            .input('id',id)
            .query(`
                DELETE FROM banners WHERE id = @id
            `)

        res.status(200).json({
            ok: true,
            msg: 'Banner eliminado'
        })
    } catch (error) {
                console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al eliminar banner'
        })
    }
};


export const putStatusBanner = async(req: Request, res: Response) => {
    try {
        const { id } = req.query;


        if(!id) {
            return res.status(400).json({
                ok: false,
                mensage: 'El id es obligatorio'
            });
        };

        const pool = await poolPromise;

        await pool.request()
            .input('id', id)
            .query(`
                UPDATE banners SET activo = 1 - activo WHERE id = @id 
            `);

        res.status(200).json({
            ok: true,
            msg: 'Banner actualizado'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al actualizar banner'
        })
    }
};