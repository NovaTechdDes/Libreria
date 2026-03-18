import { Producto } from "@/interface";

interface ProductoBackend {
  codigo: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  marca: string;
  rubro_tempo: string;
}

export const mapProducto = (item: ProductoBackend): Producto => {
  return {
    id: item.codigo,
    descripcion: item.descripcion,
    precio: item.precio,
    stock: item.cantidad,
    marca: item.marca,
    categoria: item.rubro_tempo,
  };
};

export const mapProductoBackend = (
  producto: Partial<Producto>,
): Partial<ProductoBackend> => {
  return {
    codigo: producto.id,
    precio: producto.precio,
    cantidad: producto.stock,
  };
};
