import { Producto } from './Producto';

export interface Pedido {
  envio: boolean;
  nombreCliente: string;
  numeroCliente: string;
  subTotal: number;
  total: number;
  descuento: number;

  productos: Producto[];
}
