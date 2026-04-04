export interface Caja {
  id_caja?: string;
  fecha: string;
  debe: number;
  haber: number;
  tipo_mov: 'Ingreso' | 'Egreso';
  tipo_importe: string;
  concepto: string;
}
