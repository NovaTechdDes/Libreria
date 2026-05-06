import { pool, poolConnect } from "../config/db";

export async function getRubros() {
  await poolConnect;

  const result = await pool.request().query(`
    SELECT 
    id_rubro_g,
    nom_rubro_g
    FROM rubros_generales
    ORDER BY nom_rubro_g
  `);

  const rubros = await pool.request().query(`
    SELECT 
    id_rubro,
    nom_rubro,
    id_rubro_g
    FROM rubros
    ORDER BY nom_rubro
  `);

  return {
    rubros: result.recordset,
    subrubros: rubros.recordset,
  };
}
