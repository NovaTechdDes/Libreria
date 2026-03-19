export interface Venta {
  id: string;
  fecha: string;
  total: number;
  tipo_venta?: string;
  cliente: string;
  numero: string;
  numero_comp?: string;
}
