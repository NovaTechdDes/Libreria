import { pool, poolConnect } from "../config/db";

export async function getUsuario(clave: string) {
  await poolConnect;

  const result = await pool.request().input("clave", clave).query(`
    SELECT administrador, denominacion, id_usuario FROM usuarios WHERE clave = @clave
  `);
  return result.recordset[0];
}
