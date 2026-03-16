export interface Venta {
  fecha: Date;
  numero: string;
  cliente: string;
  total: number;
  id: string;
  tipo: TipoVenta;
}

export interface TipoVenta {
  id: string;
  nombre: string;
}
