import { Producto } from "./Producto";

export interface Producto_Visto {
    producto_id: number;
    session_id: string;
    fecha: Date;
    producto?: Producto;
}

export interface Producto_VistoBackEnd extends Producto_Visto {
    _id: string;
}