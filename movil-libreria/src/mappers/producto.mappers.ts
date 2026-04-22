import { Producto } from '@/interface';

interface ProductoBackend {
  id_articulo: string;
  codigo: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  marca: string;
  rubro_tempo: string;
  id_rubro: number;
  rubro: string;
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
    id_rubro: item.id_rubro ?? 0,
    categoria: typeof item.rubro === 'string' ? JSON.parse(item.rubro)?.nom_rubro_g : ((item as any).rubro?.nom_rubro_g ?? 'Sin Categoria'),
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
