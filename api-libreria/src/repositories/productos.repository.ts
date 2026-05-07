import { pool, poolConnect } from "../config/db";
import { Producto } from "../types/Producto";
import { obtenerImagenSegura } from "../utils/obtenerImagenSegura";

export async function getProductos(
  search?: string | undefined,
  limit?: number,
  servidor?: boolean,
  id_subRubro?: number,
): Promise<Producto[]> {
  await poolConnect;

  const safeLimit = Number(limit) || 50;
  const safeSearch = search ? `%${search}%` : "%";

  let query = `WHERE activo = 1`;
  if (id_subRubro) {
    query += ` AND id_rubro = @id_subRubro`;
  }
  if (search) {
    query += ` AND (descripcion LIKE @search OR CAST(codigo AS VARCHAR) LIKE @search)`;
  }

  const result = await pool
    .request()
    .input("search", safeSearch)
    .input("id_subRubro", id_subRubro).query(`
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

  const productosConImagen = await Promise.all(
    result.recordset.map(async (producto) => {
      // Parsear el rubro si viene como string JSON desde SQL
      let rubroParsed = producto.rubro;
      if (typeof producto.rubro === "string") {
        try {
          rubroParsed = JSON.parse(producto.rubro);
        } catch (e) {
          console.error("Error al parsear rubro JSON:", e);
        }
      }

      return {
        ...producto,
        rubro: rubroParsed,
        imagen: await obtenerImagenSegura(producto.codigo, servidor),
      };
    }),
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
      UPDATE articulos
      SET precio = @precio,
          cantidad = @cantidad
      WHERE codigo = @codigo
    `);

  return result.rowsAffected[0] > 0;
}
