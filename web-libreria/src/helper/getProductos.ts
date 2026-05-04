'use server';

import pool from '@/src/lib/db';
import { Producto } from '../interface/Producto';

export async function getProductos(page: number = 1, limit: number = 20, search: string = '', activo?: boolean): Promise<{ data: Producto[]; totalPages: number; totalProductos: number }> {
  const { rows } = await pool.query(
    `
    SELECT
     p.id, p.codigo, p.descripcion, p.precio, p.cantidad, p.imagen_url, p.activo, p.isvisibleStock, p.isvisibleprecio,
      r.nombre as rubro,
      (
        SELECT COALESCE(JSON_AGG(JSON_BUILD_OBJECT(
          'id', c.id,
          'color', c.color,
          'codigo', c.codigo
        )), '[]')
        FROM producto_colores pc
        JOIN colores c ON pc.color_id = c.id
        WHERE pc.producto_id = p.id
      ) as colores
    FROM productos p 
    JOIN rubro r ON p.id_rubro = r.id 
    
    WHERE descripcion ILIKE $3 ${activo ? 'AND activo = $4' : ''}
    ORDER BY p.descripcion
    LIMIT $1
    OFFSET $2`,
    activo ? [limit, (page - 1) * limit, `%${search}%`, activo] : [limit, (page - 1) * limit, `%${search}%`]
  );

  const { rows: count } = await pool.query(`SELECT count(id) FROM productos WHERE descripcion LIKE $1`, [`%${search}%`]);

  const { rows: total } = await pool.query(`SELECT count(id) FROM productos`);

  const totalPages = Math.ceil(parseInt(count[0].count) / limit);

  if (rows.length > 0) {
    return { data: rows, totalPages, totalProductos: total[0].count };
  } else {
    return { data: [], totalPages: 0, totalProductos: 0 };
  }
}

export async function updateVisibilidadProducto(activo: boolean, id: number): Promise<boolean> {
  const { command } = await pool.query(
    `
    UPDATE productos
    SET activo = $1
    WHERE id = $2
  `,
    [activo, id]
  );

  if (command === 'UPDATE') {
    return true;
  } else {
    return false;
  }
}

export async function updateStockVisibleProducto(activo: boolean, id: number): Promise<boolean> {
  const { command } = await pool.query(
    `
    UPDATE productos
    SET isvisibleStock = $1
    WHERE id = $2
  `,
    [activo, id]
  );

  if (command === 'UPDATE') {
    return true;
  } else {
    return false;
  }
}

export async function updatePrecioVisibleProducto(activo: boolean, id: number): Promise<boolean> {
  const { command } = await pool.query(
    `
    UPDATE productos
    SET isvisibleprecio = $1
    WHERE id = $2
  `,
    [activo, id]
  );

  if (command === 'UPDATE') {
    return true;
  } else {
    return false;
  }
}
