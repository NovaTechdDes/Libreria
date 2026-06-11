import { pool, poolConnect } from "../config/db";
import { Producto } from "../types/Producto";
import { obtenerImagenSegura } from "../utils/obtenerImagenSegura";

export async function getProductos(
  search?: string | undefined,
  limit?: number,
  servidor?: boolean,
  id_subRubro?: number,
  id_rubro?: number
): Promise<Producto[]> {
  await poolConnect;


  const safeLimit = Number(limit) || 50;
  const safeSearch = search ? `%${search}%` : "%";

  let query = `WHERE a.activo = 1`;
  let joinClause = ``;

  if (id_subRubro) {
    query += ` AND a.id_rubro = @id_subRubro`;
  }
  if (id_rubro) {
    joinClause = `INNER JOIN rubros r ON a.id_rubro = r.id_rubro`;
    query += ` AND r.id_rubro_g = @id_rubro`;
  }
  if (search) {
    query += ` AND (a.descripcion LIKE @search OR CAST(a.codigo AS VARCHAR) LIKE @search)`;
  }

  const request = pool
    .request()
    .input("search", safeSearch)
    .input("id_subRubro", id_subRubro);

  if (id_rubro) {
    request.input("id_rubro", id_rubro);
  }

  const result = await request.query(`
    SELECT TOP (${safeLimit})
    a.id_articulo,
    a.codigo,
    a.descripcion,
    a.precio,
    a.cantidad,
    a.marca,
    a.rubro_tempo,
    a.id_rubro,
    a.rubro
    FROM api_articuloss a
    ${joinClause}
    ${query}
    ORDER BY a.codigo DESC
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

export async function getProductosPorRubro(
  rubros: number[],
): Promise<Producto[]> {
  await poolConnect;

  console.log(rubros)

  if (rubros.length === 0) return [];

  const request = pool.request();
  const params = rubros.map((_, index) => `@rubro${index}`);

  rubros.forEach((rubro, index) => {
    request.input(`rubro${index}`, rubro);
  });

  const result = await request.query(`
    SELECT *
    FROM api_articuloss
    WHERE id_rubro IN (${params.join(",")}) and activo = 1
  `);

  const productosConImagen = await Promise.all(
    result.recordset.map(async (producto) => {
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
        imagen: await obtenerImagenSegura(producto.codigo, false),
      };
    }),
  );

  return productosConImagen;
}
