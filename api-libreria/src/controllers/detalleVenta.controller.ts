import { NextFunction, Request, Response } from "express";
import * as service from "../services/detalleVenta.service";



export const getDetalleVenta = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { desde, hasta, rubro, subRubro } = req.query as {
      desde: string;
      hasta: string;
      rubro?: string;
      subRubro?: string;
    };

    const data = await service.obtenerDetalleVenta({desde, hasta, rubro, subRubro});

    return res.status(200).json({
      ok: true,
      data,
    })
    
  } catch (error: any) {
    // Si es un error de validación de parámetros, retornamos 400
    if (
      error.message &&
      (error.message.includes("obligatorios") || error.message.includes("formato de fecha"))
    ) {
      return res.status(400).json({
        ok: false,
        message: error.message,
      });
    }
    console.error("Error al obtener detalle de ventas:", error);
    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};
