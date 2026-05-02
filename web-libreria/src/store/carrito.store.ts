import { create } from "zustand";
import { Producto } from "../interface/Producto";

interface ProductosCarrito {
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
}));
