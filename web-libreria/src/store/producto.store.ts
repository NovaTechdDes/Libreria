import { create } from "zustand";
import { Producto } from "../interface/Producto";

export interface ProductoState {
    productoSeleccionado: Producto | null;

    // Acciones
    setProductoSeleccionado: (producto: Producto) => void;
    clearProductoSeleccionado: () => void;
};


export const useProductoStore = create<ProductoState>()(set => ({
    productoSeleccionado: null,
    
    setProductoSeleccionado: (producto) => set({ productoSeleccionado: producto }),
    clearProductoSeleccionado: () => set({ productoSeleccionado: null }),
}));