import { create } from "zustand";
import { Producto } from "../interface/Producto";

export interface ProductosCarrito {
  cantidad: number;
  producto: Producto;
  observacion?: string;
}

export interface CarritoStore {
  total: number;

  productos: ProductosCarrito[];
  agregarProducto: (
    producto: Producto,
    cantidad: number,
    observacion?: string,
  ) => void;
  actualizarCantidad: (id: number, cantidad: number) => void;
  removerProducto: (id: number) => void;
}

export const useCarritoStore = create<CarritoStore>((set) => ({
  total: 0,
  productos: [],
  agregarProducto: (
    producto: Producto,
    cantidad: number,
    observacion?: string,
  ) =>
    set((state) => ({
      productos: [...state.productos, { producto, cantidad, observacion }],
      total: state.total + producto.precio * cantidad,
    })),
  actualizarCantidad: (id: number, cantidad: number) =>
    set((state) => {
      const nuevosProductos = state.productos.map((p) =>
        p.producto.id_articulo === id ? { ...p, cantidad } : p,
      );
      const nuevoTotal = nuevosProductos.reduce(
        (acc, p) => acc + p.producto.precio * p.cantidad,
        0,
      );
      return { productos: nuevosProductos, total: nuevoTotal };
    }),
  removerProducto: (id: number) =>
    set((state) => {
      const nuevosProductos = state.productos.filter(
        (p) => p.producto.id_articulo !== id,
      );
      const nuevoTotal = nuevosProductos.reduce(
        (acc, p) => acc + p.producto.precio * p.cantidad,
        0,
      );
      return { productos: nuevosProductos, total: nuevoTotal };
    }),
}));

