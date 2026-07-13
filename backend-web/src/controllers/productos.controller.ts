import { Request, Response } from "express";
import { poolPromise } from "../config/db";
import sql from "mssql";

export const getProductos = async(req: Request, res: Response ) => {
    try {
        const {rubro, subrubro, page = 1, limit = 50, activo = 1, search = ''} = req.query;


        const pool = await poolPromise
        const request = pool.request();

         let query = `
            SELECT p.*,
            COUNT(*) OVER() as total_count,

            -- Relacion con subrubro (1 a 1) usando FROM para evitar error de sintaxis en SQL Server
            (SELECT s2.* FROM subrubros s2 WHERE s2.id_subrubro = p.id_subrubro FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) as subRubros,

            --Relacion productos_colores
            ISNULL((
                SELECT c.*
                FROM productos_colores pc
                INNER JOIN colores c ON pc.id_color = c.id
                WHERE pc.id_producto = p.id_producto
                FOR JSON PATH
            ), '[]') as productos_colores,

            -- Relacion productos variantes
            ISNULL((
                SELECT pv.*
                FROM productos_variantes pv
                WHERE pv.id_producto = p.id_producto
                FOR JSON PATH
            ), '[]') as productos_variantes

            FROM productos p
            INNER JOIN subrubros s ON p.id_subrubro = s.id_subrubro
            WHERE 1=1
        `;

     if (activo) {
        
            query += ` AND p.activo = @activo`;
            request.input('activo', 1);
        };

        if (subrubro) {
            query += ` AND p.id_subrubro = @subrubro`;
            request.input('subrubro', Number(subrubro));
        };

        if (rubro) {
            query += ` AND s.id_rubro = @rubro`;
            request.input('rubro', Number(rubro));
        };

        if (search) {
            query += ` AND (p.descripcion LIKE @search OR p.codigo LIKE @search)`;
            request.input('search', `%${search}%`);
        }


        // Evitamos offset negativo si page es 0 o menor
        const pageNum = Math.max(1, Number(page) || 1);
        const limitNum = Math.max(1, Number(limit) || 50);
        const offset = (pageNum - 1) * limitNum;

        query += `
            ORDER BY p.descripcion ASC
            OFFSET @offset ROWS
            FETCH NEXT @limit ROWS ONLY
        `;
        request.input('offset', offset);
        request.input('limit', limitNum);

       const result = await request.query(query);

       
        
        
        const data = result.recordset.map(row => ({
            ...row,
            subRubros: row.subRubros ? JSON.parse(row.subRubros) : null,
            productos_colores: row.productos_colores ? JSON.parse(row.productos_colores) : [],
            productos_variantes: row.productos_variantes ? JSON.parse(row.productos_variantes) : []
        }));
        const total = result.recordset[0]?.total_count || 0;
        

        res.json({
            ok: true,
            total,
            data
        })
    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            msg: 'Error al obtener productos'
        });
    }
};

export const getProductoById = async(req: Request, res: Response) => {
    try {
        const { id_producto } = req.params;


        const pool = await poolPromise;
        const request = pool.request();

        let query = `SELECT p.* , s.nombre as subrubro,
                    --Relacion productos_colores
                    ISNULL((
                        SELECT c.*
                        FROM productos_colores pc
                        INNER JOIN colores c ON pc.id_color = c.id
                        WHERE pc.id_producto = p.id_producto
                        FOR JSON PATH
                    ), '[]') as productos_colores,

                    -- Relacion productos variantes
                    ISNULL((
                        SELECT pv.*
                        FROM productos_variantes pv
                        WHERE pv.id_producto = p.id_producto
                        FOR JSON PATH
                    ), '[]') as variantes

                    FROM productos p
                    LEFT JOIN subrubros s ON p.id_subrubro = s.id_subrubro
                    WHERE p.id_producto = @id_producto`;

        request.input('id_producto', Number(id_producto));

        const result = await request.query(query);

        

        res.status(200).json({
            ok: true,
            data: result.recordset[0] || null
        })
    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            msg: 'Error al obtener producto'
        });
    }
};

export const putProductoById = async(req: Request, res: Response) => {
    const pool = await poolPromise
    const transaction = new sql.Transaction(pool)
    try {
        const { id_producto } = req.params;
        const {colores = [], imagenes} = req.body;

        


        await transaction.begin();

        //Eliminar Variantes de colores
        const requestDeleteColores = new sql.Request(transaction);
        let queryDeleteColores = `DELETE FROM productos_colores WHERE id_producto = @id_producto`;
        requestDeleteColores.input('id_producto', Number(id_producto));
        await requestDeleteColores.query(queryDeleteColores);


        //Agregar Variantes de colores
        let queryVarianteColores = `INSERT INTO productos_colores (id_producto, id_color) VALUES(@id_producto, @id_color)`;
        
        for(const color of colores){
            const requestVarianteColores = new sql.Request(transaction);
            requestVarianteColores.input('id_producto', Number(id_producto));
            requestVarianteColores.input('id_color', Number(color.id));
            await requestVarianteColores.query(queryVarianteColores);
        };

        await transaction.commit()

        return res.status(200).json({
            ok: true,
            msg: 'Producto actualizado'
        })
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al actualizar producto'
        })
    };
};

export const putActivoProducto = async(req: Request, res: Response) => {
    try {
        const { id_producto, activo } = req.params;

        const pool = await poolPromise
        const request = pool.request();

        let query = `UPDATE productos 
                        SET activo = @activo
                        WHERE id_producto = @id_producto`;

        request.input('activo', Number(activo));
        request.input('id_producto', id_producto);

        const result = await request.query(query);

        res.json({
            ok: true,
            data: result.recordset
        })
    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar producto'
        });
    }
};

export const putVisiblePrecio = async(req: Request, res: Response) => {
    try {
        const { id_producto, visible } = req.body;

        const pool = await poolPromise;
        const request = pool.request();

        let query = `UPDATE productos 
                        SET visible = @visible
                        WHERE id_producto = @id_producto`;

        request.input('id_producto', id_producto);
        request.input('visible', visible);

        const result = await request.query(query);

        res.json({
            ok: true,
            data: result.recordset
        })
    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar producto'
        });
    }
};

export const putIsStock = async(req: Request, res: Response) => {
    try {
        const {id_producto, isStock} = req.body;

        const pool = await poolPromise;
        const request = pool.request();

        let query = `UPDATE productos 
                        SET isStock = @isStock
                        WHERE id_producto = @id_producto`;

        request.input('id_producto', id_producto);
        request.input('isStock', Number(isStock));

        const result = await request.query(query);

        res.json({
            ok: true,
            data: result.recordset
        })
    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar producto'
        });
    }
};

export const putProducto = async(req: Request, res: Response) => {
    try {
        
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error al actualizar producto'
        })
    }
}