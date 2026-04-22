import { Request, Response, NextFunction } from "express";
import * as service from "../services/productos.service";

export const getProductos = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { search, limit, servidor, id_rubro } = req.query;

    const productos = await service.obtenerProductos(
      search as string,
      Number(limit),
      servidor === "true",
      Number(id_rubro),
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
    res.status(200).json({
      ok: true,
      message: "Producto actualizado",
      data: productoActualizado,
    });
  } catch (error) {
    res
      .status(500)
      .json({ ok: false, message: "Error al actualizar el producto" });
    next(error);
  }
};
