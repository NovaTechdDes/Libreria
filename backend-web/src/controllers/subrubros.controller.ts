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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener subrubros'
        });
    }
}