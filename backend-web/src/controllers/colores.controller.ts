import { Request, Response } from "express";
import { poolPromise } from "../config/db";


export const postColor = async(req: Request, res: Response) => {
    try {
        const { color, codigo } = req.body;

        if(!color || !codigo){
            return res.status(400).json({
                ok: false,
                msg: 'Faltan datos'
            });
        }

        const pool = await poolPromise;

        const result = await pool.request()
        .input('color', color)
        .input('codigo', codigo)
        .query(`
            INSERT INTO colores (color, codigo) VALUES (@color, @codigo)
        `)

        res.status(201).json({
            ok: true,
            msg: 'Color insertado correctamente'
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener colores'
        });
    }
};

export const putColor = async(req: Request, res: Response) => {
    try {
        const { codigo, id, color } = req.body;
       const pool = await poolPromise;

       const result = await pool.request()
       .input('id', id)
       .input('color', color)
       .input('codigo', codigo)
       .query(`
            UPDATE colores SET 
            color = @color,
            codigo = @codigo
            WHERE id = @id

            SELECT * FROM colores WHERE id = @id
       `)

       res.status(201).json({
        ok: true,
        color: result.recordset[0]
       })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar color'
        })
    }
};

export const getColores = async(req: Request, res: Response) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request().query(`
            SELECT * FROM colores
        `);

        res.status(200).json({
            ok: true,
            colores: result.recordset
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener colores'
        });
    }
};