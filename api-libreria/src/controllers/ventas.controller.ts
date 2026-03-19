import { Request, Response, NextFunction } from "express";
import * as service from "../services/ventas.service";

export const getVentasDelDia = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ventas = await service.obtenerVentasDelDia();
    res.json({ data: ventas });
  } catch (error) {
    next(error);
  }
};
