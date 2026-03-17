import { pool, poolConnect } from "../config/db";
import { Producto } from "../types/Producto";

export async function getProductos(): Promise<Producto[]> {
  await poolConnect;

  const result = await pool.request().query(`
    SELECT TOP 100
    id,
    descripcion,
    precio,
    stock
    FROM api_productos
    ORDER BY id DESC
    `);

  return result.recordset;
}

export async function searchProductos(texto: string): Promise<Producto[]> {
  await poolConnect;

  const result = await pool.request().input("texto", `%${texto}%`).query(`
    SELECT TOP 100
    id,
    descripcion,
    precio,
    stock
    FROM api_productos
    WHERE descripcion LIKE @texto OR
          id LIKE @texto    
    ORDER BY descripcion
    `);

  return result.recordset;
}

export async function putProducto(
  producto: Partial<Producto>,
): Promise<boolean> {
  await poolConnect;

  const result = await pool
    .request()
    .input("id", producto.id)
    .input("precio", producto.precio)
    .input("stock", producto.stock).query(`
      UPDATE api_productos
      SET precio = @precio,
          stock = @stock
      WHERE id = @id
    `);

  return result.rowsAffected[0] > 0;
}
