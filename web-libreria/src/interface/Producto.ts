import { Color_Relacion } from './Color';
import { Imagenes } from './Imagenes';
import { productos_variantes } from './Variantes';

export interface Producto {
  id_producto: number;
  codigo: string;

  descripcion: string;
  precio: number;
  cantidad: number;
  marca: number;
  id_subrubro: number;
  imagenes?: string;
  imagen_url?: string;
  activo: boolean;

  isstock?: boolean;
  isvisibleprecio?: boolean;

  subRubros?: {
    nombre: string;
    id_subrubro: number;
  };

  tiene_variantes: boolean;

  variantes?: productos_variantes[]

  productos_colores?: Color_Relacion[];

  url_imagenes?: Imagenes[]
}

export interface ProductoBackend {
  id_producto: number;
  codigo: string;

  descripcion: string;
  precio: number;
  cantidad: number;
  marca: number;
  id_subrubro: number;
  imagenes?: string;
  imagen_url?: string;
  activo: boolean;

  isstock?: boolean;
  isvisibleprecio?: boolean;

  subRubros?: {
    nombre: string;
    id_subrubro: number;
  };

  tiene_variantes: boolean;

  variantes?: string;

  productos_colores?: string;

  url_imagenes?: string
}
