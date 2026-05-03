import { Color } from "./Color";

export interface Producto {
  id?: number;
  codigo: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  marca: number;
  id_rubro: number;
  imagen_url?: string;
  activo: boolean;

  colores?: Color[]
}
