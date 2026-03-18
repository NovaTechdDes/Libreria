import * as repo from "../repositories/productos.repository";
import { Producto } from "../types/Producto";

export async function obtenerProductos(
  search?: string | undefined,
  limit?: number,
) {
  return await repo.getProductos(search, limit);
}

export async function putProducto(producto: Partial<Producto>) {
  return await repo.putProducto(producto);
}
