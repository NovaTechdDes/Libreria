import { Producto, ProductoBackend } from "../interface/Producto";

export const mapProducto = (producto: ProductoBackend): Producto => {
    return {
        ...producto,
        url_imagenes: JSON.parse(producto.url_imagenes || '[]'),
        productos_colores: JSON.parse(producto.productos_colores || '[]'),
        variantes: JSON.parse(producto.variantes || '[]'),
    };
}