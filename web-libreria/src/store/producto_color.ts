import { create } from 'zustand';

interface ProductoColorState {
  productoColorSeleccionado: {
    id_producto: number;
    id_color: number;
  };
  seleccionarProductoColor: (id_producto: number, id_color: number) => void;
}

export const useProductoColorStore = create<ProductoColorState>((set) => ({
  productoColorSeleccionado: {
    id_producto: 0,
    id_color: 0,
  },
  seleccionarProductoColor: (id_producto: number, id_color: number) => set({ productoColorSeleccionado: { id_producto, id_color } }),
}));
