import { Response, NextFunction, Request } from "express";
import { poolPromise } from "../config/db";


export const getRubros = async(req: Request, res: Response) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request().query(`
            SELECT r.*, (
                SELECT s.*
                from subrubros s
                where s.id_rubro = r.id
                FOR JSON PATH
            ) AS subrubros
             FROM rubros r
            
        `)


        res.status(200).json({
            ok: true,
            rubros: result.recordset
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener rubros'
        });
    }
}