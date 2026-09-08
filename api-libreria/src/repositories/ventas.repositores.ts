import { pool, poolConnect } from "../config/db";
import { getLocalDateString } from "../utils/date";
import * as sql from 'mssql';

export async function getVentasDelDia() {
  const fecha = getLocalDateString();
  await poolConnect;
  const result = await pool.request()
  .input('fecha', sql.VarChar(10), fecha)
  .query(`
        SELECT 
        fecha_venta, comprobante, letra_fac, num_fac, importe, cond_venta, id_venta 
        FROM ventas WHERE fecha_venta = @fecha
    `);
  return result.recordset;
}
