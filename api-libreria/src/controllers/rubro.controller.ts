import { NextFunction, Request, Response } from "express";
import * as service from "../services/rubro.service";

export const getRubros = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const rubros = await service.obtenerRubros();
    res.status(200).json({
      ok: true,
      data: rubros,
    });
  } catch (error) {
    next(error);
  }
};
