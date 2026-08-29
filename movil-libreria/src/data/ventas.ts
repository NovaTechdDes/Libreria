import { Venta } from "@/interface";

export const ventas: Venta[] = [
  {
    id: "1",
    numero: "1",
    cliente: "Juan Perez",
    total: 100,
    fecha: new Date().toISOString(),
    tipo_venta: "Efectivo",
  },
  {
    id: "2",
    cliente: "Maria Lopez",
    total: 200,
    numero: "2",
    fecha: new Date().toISOString(),
    tipo_venta: "Debito",
  },
  {
    id: "3",
    numero: "3",
    cliente: "Pedro Ramirez",
    total: 300,
    fecha: new Date().toISOString(),
    tipo_venta: "Credito",
  },
];
