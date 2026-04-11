import { pool, poolConnect } from "../config/db";
import { Producto } from "../types/Producto";
import { obtenerImagenSegura } from "../utils/obtenerImagenSegura";

export async function getProductos(
  search?: string | undefined,
  limit?: number,
): Promise<Producto[]> {
  await poolConnect;

  const safeLimit = Number(limit) || 50;
  const safeSearch = search ? `%${search}%` : "%";

  const query = search
    ? `WHERE descripcion LIKE @search OR CAST(codigo AS VARCHAR) LIKE @search`
    : "";

  const result = await pool.request().input("search", safeSearch).query(`
    SELECT TOP (${safeLimit})
    id_articulo,
    codigo,
    descripcion,
    precio,
    cantidad,
    marca,
    rubro_tempo
    FROM api_articuloss
    ${query}
    ORDER BY codigo DESC
    `);

  const productosConImagen = await Promise.all(
    result.recordset.map(async (producto) => ({
      ...producto,
      imagen: await obtenerImagenSegura(producto.codigo),
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
