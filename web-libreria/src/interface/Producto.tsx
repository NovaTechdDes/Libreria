export interface Producto {
  id_articulo?: number;
  codigo: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  marca: number;
  id_rubro: number;
  imagen?: string;
}
