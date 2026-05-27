import { Producto } from "../types/Producto";

interface ProductoSupabase {
  descripcion: string;
  id_subrubro: number;
  precio: number;
  cantidad: number;
  marca?: string;

  id_interno: number;
}

export const mapProductos = (productos: Producto[]): ProductoSupabase[] => {
  console.log(productos[0])
  return productos.map((producto) => ({
    descripcion: producto.descripcion?.trim()?.toUpperCase() || "",
    id_subrubro: producto.id_rubro,
    precio: producto.precio,
    cantidad: Math.floor(producto.cantidad),
    marca: producto.marca?.trim().toUpperCase(),
    id_interno: producto.id_articulo,
  }));
};
