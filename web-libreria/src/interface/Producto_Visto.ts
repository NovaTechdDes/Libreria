
export interface Producto_Visto {
    producto_id: number;
    session_id: string;
    fecha: Date;

}

export interface Producto_VistoBackEnd extends Producto_Visto {
    id_producto: number | string;
    descripcion: string;
    precio: number;
    cantidad: number;
    vistas: number;
    url_imagen?: string;
}