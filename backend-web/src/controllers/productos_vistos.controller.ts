import { poolPromise } from "../config/db";
import { Response, NextFunction, Request } from "express";
import { ProductosVistos } from "../types/productos_vistos";

export const getProductosVistos = async(req: Request, res: Response) => {
    try {
        const pool = await poolPromise;

        const fecha = req.query.fecha as string;

        if (!fecha) {
            return res.status(400).json({
                ok: false,
                msg: 'Debe proporcionar una fecha'
            });
        }

        const result = await pool.request()
            .input('fecha', fecha)
            .query(`
                SELECT p.id_producto, p.descripcion, COUNT(pv.id) AS total_vistas
                FROM productos_vistos pv
                INNER JOIN productos p ON pv.producto_id = p.id_producto
                GROUP BY p.id_producto, p.descripcion
                ORDER BY total_vistas DESC

            `)

        res.status(200).json({
            ok: true,
            productosVistos: result.recordset as unknown as ProductosVistos[]
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener productos vistos'
        });
    }
};

export const postProductosVistos = async (req: Request, res: Response) => {
    try {
        const { producto_id, session_id, fecha } = req.body;
        const pool = await poolPromise;
        const result = await pool.request()
            .input('producto_id', producto_id)
            .input('session_id', session_id)
            .input('fecha', fecha)
            .query(`
                INSERT INTO productos_vistos (producto_id, session_id, fecha)
                VALUES (@producto_id, @session_id, @fecha)
            `);
        res.status(201).json({
            ok: true,
            msg: 'Producto visto agregado correctamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al agregar producto visto'
        });
    }
}