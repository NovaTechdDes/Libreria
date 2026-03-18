import { Request, Response, NextFunction } from "express";
import * as service from "../services/productos.service";

export const getProductos = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { search, limit } = req.query;

    const productos = await service.obtenerProductos(
      search as string,
      Number(limit),
    );
    res.json({ data: productos });
  } catch (error) {
    next(error);
  }
};

export const searchProductos = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { texto } = req.params;
    const productos = await service.buscarProductos(texto as string);
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
