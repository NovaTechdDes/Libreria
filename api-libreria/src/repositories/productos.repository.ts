import { pool, poolConnect } from "../config/db";
import { Producto } from "../types/Producto";
import { obtenerImagenSegura } from "../utils/obtenerImagenSegura";

export async function getProductos(
  search?: string | undefined,
  limit?: number,
  servidor?: boolean,
  id_rubro?: number,
): Promise<Producto[]> {
  await poolConnect;

  const safeLimit = Number(limit) || 50;
  const safeSearch = search ? `%${search}%` : "%";

  let query = `WHERE activo = 1`;
  if (id_rubro) {
    query += ` AND id_rubro = @id_rubro`;
  }
  if (search) {
    query += ` AND (descripcion LIKE @search OR CAST(codigo AS VARCHAR) LIKE @search)`;
  }

  const result = await pool
    .request()
    .input("search", safeSearch)
    .input("id_rubro", id_rubro).query(`
    SELECT TOP (${safeLimit})
    id_articulo,
    codigo,
    descripcion,
    precio,
    cantidad,
    marca,
    rubro_tempo,
    id_rubro,
    
    rubro
    FROM api_articuloss
    ${query}
    ORDER BY codigo DESC
    `);

  console.log(result);

  const productosConImagen = await Promise.all(
    result.recordset.map(async (producto) => ({
      ...producto,
      imagen: await obtenerImagenSegura(producto.codigo, servidor),
    })),
  );

  return productosConImagen;
}

export async function putProducto(
  producto: Partial<Producto>,
): Promise<boolean> {
  await poolConnect;

  const result = await pool
    .request()
    .input("codigo", producto.codigo)
    .input("precio", producto.precio)
    .input("cantidad", producto.cantidad).query(`
      UPDATE api_articuloss
      SET precio = @precio,
          cantidad = @cantidad
      WHERE codigo = @codigo
    `);

  return result.rowsAffected[0] > 0;
}
