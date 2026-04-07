export interface Producto {
  precio: number;
  stock: number;
  id: string;
  codigo: string;
  marca?: string;
  categoria: string;
  imagen?: string;
  descripcion: string;
}
