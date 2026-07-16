import { Request, Response } from "express";
import { poolPromise } from "../config/db";

export const getSubrubros = async(req: Request, res: Response) => {
    try {
        const pool = await poolPromise;
        const result = await pool
        .request()
        .query(`SELECT * FROM subrubros`);

        res.status(200).json({
            ok: true,
            subrubros: result.recordset
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener subrubros'
        });
    }
}

export const getSubrubroPorRubro = async(req: Request, res: Response) => {
    try {
        const { idRubro } = req.params;

        
        if (!idRubro) {
            return res.status(400).json({
                ok: false,
                msg: 'El idRubro es obligatorio'
            });
        }

        const pool = await poolPromise;

        if(isNaN(Number(idRubro))){
            const result = await pool
            .request()
            .query(`SELECT * FROM subrubros`)

            return res.status(200).json({
                ok: true,
                subrubros: result.recordset
            });
        }  
        
        const result = await pool
        .request()
        .input('idRubro', Number(idRubro))
        .query('SELECT * FROM subrubros WHERE id_rubro = @idRubro ORDER BY nombre')

        res.status(200).json({
            ok: true,
            subrubros: result.recordset
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener subrubro'
        })
    }
}