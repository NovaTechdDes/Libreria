export interface DetalleVenta {
    id_venta: number;
    codigo_articulo: number;
    producto: string;
    cantidad_art: number;
    stock: number;
    precio: number;
    total_recaudado?: number;
    id_subrubro?: number | null;
    subrubro?: string | null;
    id_rubro?: number | null;
    rubro_general?: string | null;
}