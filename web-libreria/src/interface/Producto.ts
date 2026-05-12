import { Color } from './Color';

export interface Producto {
  id_producto: number;
  codigo: string;

  descripcion: string;
  precio: number;
  cantidad: number;
  marca: number;
  id_subRubro: number;
  imagen?: string;
  imagen_url?: string;
  activo: boolean;

  isstock?: boolean;
  isvisibleprecio?: boolean;

  subRubros?: {
    nombre: string;
    id_subrubro: number;
  };

  productos_colores?: Color[];
}
