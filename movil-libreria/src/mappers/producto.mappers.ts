import { Producto } from '@/interface';

interface ProductoBackend {
  id_articulo: string;
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
    id: item.id_articulo,
    codigo: item.codigo ?? '',
    descripcion: item.descripcion ?? '',
    precio: item.precio ?? 0,
    stock: item.cantidad ?? 0,
    marca: item.marca ?? 'Sin Marca',
    categoria: item.rubro_tempo ?? 'Sin Categoria',
    imagen: item.imagen ?? '',
  };
};

export const mapProductoBackend = (producto: Partial<Producto>): Partial<ProductoBackend> => {
  return {
    codigo: producto.codigo,
    precio: producto.precio,
    cantidad: producto.stock,
  };
};
