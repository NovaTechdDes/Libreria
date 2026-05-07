import * as repo from "../repositories/productos.repository";
import { Producto } from "../types/Producto";

export async function obtenerProductos(
  search?: string | undefined,
  limit?: number,
  servidor?: boolean,
  id_subrubro?: number,
) {
  return await repo.getProductos(
    search,
    limit,
    servidor,
    id_subrubro,
  );
}

export async function putProducto(producto: Partial<Producto>) {
  const result = await repo.putProducto(producto);
  return result;
}
