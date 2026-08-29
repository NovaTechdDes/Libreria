import { Producto } from '@/interface';
import { create } from 'zustand';

export interface ProductoState {
  modal: boolean;
  abrirModal: () => void;
  cerrarModal: () => void;

  buscador: string;
  setBuscador: (buscador: string) => void;

  productoSeleccionado: Producto | null;
  seleccionarProducto: (producto: Producto) => void;

  limpiarProducto: () => void;

  rubroSeleccionado: number | null;
  seleccionarRubro: (rubro: number | null) => void;

  subRubroSeleccionado: number | null;
  seleccionarSubRubro: (subRubro: number | null) => void;
}

export const useProductoStore = create<ProductoState>((set) => ({
  modal: false,
  abrirModal: () => set({ modal: true }),
  cerrarModal: () => set({ modal: false }),

  buscador: '',
  setBuscador: (buscador: string) => set({ buscador }),

  productoSeleccionado: null,
  seleccionarProducto: (producto: Producto) => set({ productoSeleccionado: producto }),

  limpiarProducto: () => set({ productoSeleccionado: null }),

  rubroSeleccionado: null,
  seleccionarRubro: (rubro: number | null) => set({ rubroSeleccionado: rubro }),

  subRubroSeleccionado: null,
  seleccionarSubRubro: (subRubro: number | null) => set({ subRubroSeleccionado: subRubro }),
}));
