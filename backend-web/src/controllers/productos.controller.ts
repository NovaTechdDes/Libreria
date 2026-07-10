import { Request, Response } from "express";
import { poolPromise } from "../config/db";

export const getProductos = async(req: Request, res: Response ) => {
    try {
        const {rubro, subrubro, page = 0, limit = 20, activo = 1} = req.params;

        const pool = await poolPromise
        const request = pool.request();

         let query = `
            SELECT p.* 
            FROM productos p
            INNER JOIN subrubros s ON p.id_subrubro = s.id_subrubro
            WHERE 1=1
        `;

     if (activo) {
            query += ` AND p.activo = @activo`;
            request.input('activo', activo);
        }
        if (subrubro) {
            query += ` AND p.id_subrubro = @subrubro`;
            request.input('subrubro', subrubro);
        }
        if (rubro) {
            query += ` AND s.id_rubro = @rubro`;
            request.input('rubro', rubro);
        }


       const offset = Number(page) * Number(limit);
        query += `
            ORDER BY p.id_producto
            OFFSET @offset ROWS
            FETCH NEXT @limit ROWS ONLY
        `;
        request.input('offset', offset);
        request.input('limit', Number(limit));
        // 4. Ejecutamos la consulta
        const result = await request.query(query);

        res.json({
            ok: true,
            data: result.recordset
        })
    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            msg: 'Error al obtener productos'
        });
    }
}