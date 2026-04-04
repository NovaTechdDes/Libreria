import { NextFunction, Request, Response } from "express";
import * as service from "../services/caja.service";

export const getVales = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const vales = await service.obtenerValesDelDia();
    res.status(200).json({ data: vales, ok: true });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getMovCaja = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const movCaja = await service.obtenerMovCajaDelDia();
    res.status(200).json({ data: movCaja, ok: true });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const cerrarCaja = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const movCaja = await service.cerrarCajaDelDia();
    res.status(200).json({ data: movCaja, ok: true });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
