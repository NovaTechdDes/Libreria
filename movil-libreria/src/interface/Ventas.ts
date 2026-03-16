export interface Venta {
  fecha: Date;
  numero: string;
  importe: number;
  id: string;
  tipo: TipoVenta;
}

export interface TipoVenta {
  id: string;
  nombre: string;
}
