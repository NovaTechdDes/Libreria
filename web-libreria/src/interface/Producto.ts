import { Color } from './Color';

export interface Producto {
  id?: number;
  id_articulo?: number;
  codigo: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  marca: number;
  id_rubro: number;
  imagen?: string;
  imagen_url?: string;
  activo: boolean;

  isvisiblestock?: boolean;
  isvisibleprecio?: boolean;

  colores?: Color[];
}
