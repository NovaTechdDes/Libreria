import { Request, Response, NextFunction } from "express";
import * as service from "../services/productos.service";

export const getProductos = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { search, limit, servidor } = req.query;

    const productos = await service.obtenerProductos(
      search as string,
      Number(limit),
      servidor === "true",
    );
    res.json({ data: productos });
  } catch (error) {
    next(error);
  }
};

export const putProducto = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const producto = req.body;
    const productoActualizado = await service.putProducto(producto);
    res.json({ data: productoActualizado });
  } catch (error) {
    next(error);
  }
};
