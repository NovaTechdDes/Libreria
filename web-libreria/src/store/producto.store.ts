import { create } from 'zustand';
import { Color } from '../interface/Color';

export interface ProductoState {
  productoSeleccionado: number | null;
  coloresSeleccionados: Color[];

  // Acciones
  setProductoSeleccionado: (idProducto: number) => void;
  clearProductoSeleccionado: () => void;
  addColores: (colores: Color[]) => void;
  clearColores: () => void;
  removeColor: (color: Color) => void;
}

export const useProductoStore = create<ProductoState>()((set) => ({
  productoSeleccionado: null,
  coloresSeleccionados: [],

  setProductoSeleccionado: (idProducto: number) => set({ productoSeleccionado: idProducto }),
  clearProductoSeleccionado: () => set({ productoSeleccionado: null }),

  addColores: (colores) => set({ coloresSeleccionados: colores }),
  clearColores: () => set({ coloresSeleccionados: [] }),
  removeColor: (color) =>
    set((state) => ({
      coloresSeleccionados: (state.coloresSeleccionados ?? []).filter((c) => c.id !== color.id),
    })),
}));
