import { Producto, ProductoBackend } from "../interface/Producto";

export const mapProducto = (producto: ProductoBackend): Producto => {
    return {
        ...producto,
        productos_colores: JSON.parse(producto.productos_colores || '[]'),
        variantes: JSON.parse(producto.variantes || '[]'),
    };
}