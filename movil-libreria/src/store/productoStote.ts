import { Producto } from "@/interface";
import { create } from "zustand";

export interface ProductoState {
  modal: boolean;
  abrirModal: () => void;
  cerrarModal: () => void;

  buscador: string;
  setBuscador: (buscador: string) => void;

  productoSeleccionado: Producto | null;
  seleccionarProducto: (producto: Producto) => void;

  limpiarProducto: () => void;
}

export const useProductoStore = create<ProductoState>((set) => ({
  modal: false,
  abrirModal: () => set({ modal: true }),
  cerrarModal: () => set({ modal: false }),

  buscador: "",
  setBuscador: (buscador: string) => set({ buscador }),

  productoSeleccionado: null,
  seleccionarProducto: (producto: Producto) =>
    set({ productoSeleccionado: producto }),

  limpiarProducto: () => set({ productoSeleccionado: null }),
}));
