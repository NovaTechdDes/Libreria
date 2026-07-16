import { Request, Response } from "express";
import { poolPromise } from "../config/db";
import sql from "mssql";

export const postVarianteProducto = async (req: Request, res: Response) => {
    const pool = await poolPromise;
    const transaction = new sql.Transaction(pool);
    try {
        const { id_producto, nombre  } = req.body;


        await transaction.begin();

        const requestVariante = new sql.Request(transaction);
        let queryVariante = `
            INSERT INTO productos_variantes
            (id_producto, nombre)
            VALUES(@id_producto, @nombre)
        `;

        requestVariante.input('id_producto', sql.Int, id_producto);
        requestVariante.input('nombre', sql.VarChar, nombre);
        await requestVariante.query(queryVariante);

        const requestProducto = new sql.Request(transaction);
        const queryProducto = ` Update productos SET tiene_variantes = 1 WHERE id_producto = @id`;
        requestProducto.input('id', sql.Int, id_producto);
        await requestProducto.query(queryProducto);

        await transaction.commit();

        res.json({
            ok: true,
            msg: "Variante de producto creada exitosamente",
        })
        
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error al crear variante de producto",
            
        })
    }
};


export const deleteVarianteProducto = async(req: Request, res: Response) => {
    const pool = await poolPromise;
    const transaction = new sql.Transaction(pool);

    try {
        const { id_producto } = req.params;

        await transaction.begin();

        const requestVariante = new sql.Request(transaction);
        let queryVariante = `DELETE FROM productos_variantes WHERE id_producto = @id`;
        requestVariante.input('id', sql.Int, id_producto);
        await requestVariante.query(queryVariante);

        const requestVerificacion = new sql.Request(transaction);
        let queryVerificacion = `SELECT id_producto FROM productos_variantes WHERE id_producto = @id`;
        requestVerificacion.input('id', sql.Int, id_producto);
        const tieneVariante = (await requestVerificacion.query(queryVerificacion)).recordset.length;

        

        if(!tieneVariante){
            const requestProducto = new sql.Request(transaction);
            const queryProducto = `UPDATE productos SET tiene_variantes = 0 WHERE id_producto = @id`;
            requestProducto.input('id', sql.Int, id_producto);
            await requestProducto.query(queryProducto);
        }

        await transaction.commit();

        res.json({
            ok: true,
            msg: "Variante de producto eliminada exitosamente",
        })
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error al eliminar variante de producto",
        })
    }
}