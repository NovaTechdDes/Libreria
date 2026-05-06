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
  rubro: any;
  imagen?: string;
}

export const mapProducto = (item: ProductoBackend): Producto => {
  const rubroParsed = typeof item.rubro === 'string' ? JSON.parse(item.rubro) : item.rubro;

  return {
    id: item.id_articulo,
    codigo: item.codigo ?? '',
    descripcion: item.descripcion ?? '',
    precio: item.precio ?? 0,
    stock: item.cantidad ?? 0,
    marca: item.marca ?? 'Sin Marca',
    id_rubro: item.id_rubro ?? 0,
    categoria: rubroParsed?.sub_rubro?.nom_rubro ?? rubroParsed?.rubro_g?.nom_rubro_g ?? 'Sin Categoria',
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
