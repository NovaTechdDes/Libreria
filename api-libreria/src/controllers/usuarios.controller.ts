import { Request, Response, NextFunction } from "express";
import * as service from "../services/usuarios.service";

export const getUsuarioByClave = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { clave } = req.params;
    const usuario = await service.obtenerUsuario(clave as string);
    res.json({ data: usuario });
  } catch (error) {
    next(error);
  }
};
