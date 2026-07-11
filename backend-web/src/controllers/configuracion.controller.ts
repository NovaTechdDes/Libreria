import { Request, Response } from "express";
import { poolPromise } from "../config/db";

export const putDescuentoConfig = async(req: Request, res: Response) => {
    try {
        const { id, porcentaje_descuento, frase_descuento } = req.body;

        const pool = await poolPromise;

        const result = await pool.request()
        .input('id', id)
        .input('porcentaje_descuento', porcentaje_descuento)
        .input('frase_descuento', frase_descuento)
        .query(`
            UPDATE configuracion SET 
            porcentaje_descuento = @porcentaje_descuento,
            frase_descuento = @frase_descuento
            WHERE id = @id

            SELECT * FROM configuracion WHERE id = @id
        `)

        res.status(201).json({
            ok: true,
            configuracion: result.recordset[0]
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al actualizar descuento'
        })
    }
};

export const putBannerConfig = async(req: Request, res: Response) => {
    try {
        const {id, mensaje_informativo, fecha_inicio, fecha_fin, carrito_habilitado} = req.body;
        const pool = await poolPromise;

        const result = await pool.request()
        .input('id', id)
        .input('mensaje_informativo', mensaje_informativo)
        .input('fecha_inicio', fecha_inicio)
        .input('fecha_fin', fecha_fin)
        .input('carrito_habilitado', carrito_habilitado)
        .query(`
            UPDATE configuracion SET 
            mensaje_informativo = @mensaje_informativo,
            fecha_inicio = @fecha_inicio,
            fecha_fin = @fecha_fin,
            carrito_habilitado = @carrito_habilitado
            WHERE id = @id

            SELECT * FROM configuracion WHERE id = @id
        `)

        res.status(201).json({
            ok: true,
            configuracion: result.recordset[0]
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al actualizar banner'
        })
    }
};

export const getConfig = async(req: Request, res: Response) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(
            `SELECT * FROM configuracion`
        );
        return res.status(200).json({
            ok: true,
            configuracion: result.recordset[0]
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener configuracion'
        });
    }
};
