import { Venta } from "@/interface";

interface VentaBackend {
  id_venta: number;
  fecha_venta: string;
  comprobante: string;
  letra_fac: string;
  num_fac: string;
  importe: number;
  cond_venta: string;
}

export const mapVenta = (venta: VentaBackend): Venta => {
  return {
    id: venta.id_venta.toString(),
    fecha: venta.fecha_venta,
    total: venta.importe,
    tipo_venta: venta.cond_venta,
    cliente: "Consumidor Final",
    numero: venta.num_fac,
    numero_comp: `${venta.comprobante}-${venta.letra_fac}-${venta.num_fac}`,
  };
};
