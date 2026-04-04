import { Caja } from '@/interface';

interface CajaBackend {
  id_caja: string;
  fecha: string;
  debe: number;
  haber: number;
  tipo_mov: 'Ingreso' | 'Egreso';
  tipo_importe: string;
  concepto: string;
}

export const mapCaja = (item: CajaBackend): Caja => {
  return {
    id_caja: item.id_caja,
    fecha: item.fecha,
    debe: item.debe,
    haber: item.haber,
    tipo_mov: item.tipo_mov,
    tipo_importe: item.tipo_importe,
    concepto: item.concepto,
  };
};
