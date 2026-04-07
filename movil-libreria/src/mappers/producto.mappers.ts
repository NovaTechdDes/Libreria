import { Producto } from '@/interface';

interface ProductoBackend {
  id: string;
  codigo: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  marca: string;
  rubro_tempo: string;
  imagen?: string;
}

export const mapProducto = (item: ProductoBackend): Producto => {
  return {
    id: item.id,
    codigo: item.codigo,
    descripcion: item.descripcion,
    precio: item.precio,
    stock: item.cantidad,
    marca: item.marca,
    categoria: item.rubro_tempo,
    imagen: item.imagen,
  };
};

export const mapProductoBackend = (producto: Partial<Producto>): Partial<ProductoBackend> => {
  return {
    codigo: producto.codigo,
    precio: producto.precio,
    cantidad: producto.stock,
  };
};
