import { Request, Response } from "express";
import { poolPromise } from "../config/db";

export const postVarianteProducto = async (req: Request, res: Response) => {
    try {
        const { producto_id, variante  } = req.body;
        const pool = await poolPromise;
        const result = await pool.request();
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: "Error al crear variante de producto",
            
        })
    }
}