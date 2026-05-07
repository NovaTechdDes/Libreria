import { Producto } from './Producto';

export interface Pedido {
  nombreCliente: string;
  numeroCliente: string;
  subTotal: number;
  total: number;
  descuento: number;
  envio: boolean;

  productos: Producto[];
}
