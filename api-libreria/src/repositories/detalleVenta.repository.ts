import sql from "mssql";
import { pool, poolConnect } from "../config/db";

export interface DetalleVentaFilter {
    desde: string;
    hasta: string;
    rubro?: number;
    subRubro?: number;
};


export async function getDetalleVentaFromDB(filters: DetalleVentaFilter){
    await poolConnect;

    const request = pool.request();

    //Parametros de tipados obligatorios
    request.input('desde', sql.VarChar(10), filters.desde);
    request.input('hasta', sql.VarChar(10), filters.hasta);
    
    let conditions = `WHERE v.fecha_venta BETWEEN @desde AND @hasta`;

    // Filtros condicionales validados
    if(filters.subRubro !== undefined && !isNaN(filters.subRubro)){
        conditions += `AND r.id_rubro = @subRubro`;
        request.input('subRubro', sql.Int, filters.subRubro) 
    };

    if (filters.rubro !== undefined && !isNaN(filters.rubro)) {
        conditions += ` AND rg.id_rubro_g = @rubro`;
        request.input("rubro", sql.Int, filters.rubro);
    };

     const query = `
    SELECT 
      a.id_articulo,
      a.codigo AS codigo_articulo,
      a.descripcion AS producto,
      ISNULL(a.cantidad, 0) AS stock,
      ISNULL(a.precio, 0) AS precio,
      ROUND(SUM(dv.cantidad_art), 2) AS cantidad_art,
      ROUND(SUM(dv.cantidad_art * ISNULL(a.precio, 0)), 2) AS total_recaudado,
      r.id_rubro AS id_subrubro,
      r.nom_rubro AS subrubro,
      rg.id_rubro_g AS id_rubro,
      rg.nom_rubro_g AS rubro_general
    FROM ventas v
    INNER JOIN detalle_venta dv ON v.id_venta = dv.id_venta
    INNER JOIN articulos a ON dv.id_articulo = a.id_articulo
    LEFT JOIN rubros r ON a.id_rubro = r.id_rubro
    LEFT JOIN rubros_generales rg ON r.id_rubro_g = rg.id_rubro_g
    ${conditions}
    GROUP BY 
      a.id_articulo,
      a.codigo,
      a.descripcion,
      a.cantidad,
      a.precio,
      r.id_rubro,
      r.nom_rubro,
      rg.id_rubro_g,
      rg.nom_rubro_g
    ORDER BY cantidad_art DESC
  `;
  const result = await request.query(query);
  return result.recordset;
}