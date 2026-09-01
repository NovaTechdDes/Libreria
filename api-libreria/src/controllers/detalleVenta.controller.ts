import { Request, Response } from "express";
import { pool, poolConnect } from "../config/db";


export const getDetalleVenta = async (req: Request, res: Response) => {
  try {
    const { desde, hasta, rubro, subRubro } = req.query as {
      desde?: string;
      hasta?: string;
      rubro?: string;
      subRubro?: string;
    };
    if (!desde || !hasta) {
      return res.status(400).json({
        message: "Los parámetros 'desde' y 'hasta' son obligatorios (formato YYYY-MM-DD)",
      });
    }
    await poolConnect;
    let conditions = `WHERE v.fecha_venta BETWEEN @desde AND @hasta`;
    const request = pool.request();
    request.input("desde", desde);
    request.input("hasta", hasta);
    if (subRubro) {
      conditions += ` AND r.id_rubro = @subRubro`;
      request.input("subRubro", Number(subRubro));
    }
    if (rubro) {
      conditions += ` AND rg.id_rubro_g = @rubro`;
      request.input("rubro", Number(rubro));
    }
    const query = `
      SELECT 
        a.id_articulo,
        a.codigo AS codigo_articulo,
        a.descripcion AS producto,
        a.cantidad AS stock,
        a.precio AS precio,
        SUM(dv.cantidad_art) AS cantidad_art,
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
    return res.status(200).json({
        ok: true,
        data:result.recordset
    });
  } catch (error) {
    console.error("Error al obtener detalle de ventas:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
