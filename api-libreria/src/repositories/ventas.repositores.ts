import { pool, poolConnect } from "../config/db";

export async function getVentasDelDia() {
  const fecha = new Date().toISOString().split("T")[0];
  console.log(fecha);
  await poolConnect;
  const result = await pool.request().query(`
        SELECT 
        fecha_venta, comprobante, letra_fac, num_fac, importe, cond_venta, id_venta 
        FROM ventas WHERE fecha_venta = '${fecha}'
    `);
  return result.recordset;
}
