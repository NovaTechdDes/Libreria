import { create } from 'zustand';
import { Producto } from '../interface/Producto';
import { Color } from '../interface/Color';

export interface ProductoState {
  productoSeleccionado: Producto | null;
  coloresSeleccionados: Color[];

  // Acciones
  setProductoSeleccionado: (producto: Producto) => void;
  clearProductoSeleccionado: () => void;
  addColores: (colores: Color[]) => void;
  clearColores: () => void;
  removeColor: (color: Color) => void;
}

export const useProductoStore = create<ProductoState>()((set) => ({
  productoSeleccionado: null,
  coloresSeleccionados: [],

  setProductoSeleccionado: (producto) => set({ productoSeleccionado: producto }),
  clearProductoSeleccionado: () => set({ productoSeleccionado: null }),

  addColores: (colores) => set({ coloresSeleccionados: colores }),
  clearColores: () => set({ coloresSeleccionados: [] }),
  removeColor: (color) =>
    set((state) => ({
      coloresSeleccionados: (state.coloresSeleccionados ?? []).filter((c) => c.id !== color.id),
    })),
}));
