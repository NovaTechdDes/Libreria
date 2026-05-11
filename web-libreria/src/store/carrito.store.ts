import { create } from 'zustand';
import { Producto } from '../interface/Producto';

export interface ProductosCarrito {
  cantidad: number;
  producto: Producto;
  observacion?: string;
}

export interface CarritoStore {
  subtotal: number;
  total: number;

  habilitado: boolean;
  setHabilitado: (habilitado: boolean) => void;

  mensaje: string;
  setMensaje: (mensaje: string) => void;

  descuento: number;
  setDescuento: (descuento: number) => void;

  frase: string;
  setFrase: (frase: string) => void;

  productos: ProductosCarrito[];
  agregarProducto: (producto: Producto, cantidad: number, observacion?: string) => void;
  actualizarCantidad: (id: number, cantidad: number) => void;
  removerProducto: (id: number) => void;
}

export const useCarritoStore = create<CarritoStore>((set) => ({
  total: 0,
  subtotal: 0,
  productos: [],
  agregarProducto: (producto: Producto, cantidad: number, observacion?: string) =>
    set((state) => ({
      productos: [...state.productos, { producto, cantidad, observacion }],
      total: state.total + producto.precio * cantidad,
    })),
  actualizarCantidad: (id: number, cantidad: number) =>
    set((state) => {
      const nuevosProductos = state.productos.map((p) => (p.producto.id_producto === id ? { ...p, cantidad } : p));
      const nuevoTotal = nuevosProductos.reduce((acc, p) => acc + p.producto.precio * p.cantidad, 0);
      return { productos: nuevosProductos, total: nuevoTotal };
    }),
  removerProducto: (id: number) =>
    set((state) => {
      const nuevosProductos = state.productos.filter((p) => p.producto.id_producto !== id);
      let nuevoTotal = nuevosProductos.reduce((acc, p) => acc + p.producto.precio * p.cantidad, 0);
      nuevoTotal = nuevoTotal - (nuevoTotal * state.descuento) / 100;
      return { productos: nuevosProductos, total: nuevoTotal };
    }),

  habilitado: false,
  setHabilitado: (habilitado: boolean) => set({ habilitado }),

  mensaje: '',
  setMensaje: (mensaje: string) => set({ mensaje }),

  descuento: 0,
  setDescuento: (descuento: number) =>
    set((state) => {
      const subtotal = state.productos.reduce((acc, p) => acc + p.producto.precio * p.cantidad, 0);
      const total = subtotal - (subtotal * descuento) / 100;
      return { descuento, total, subtotal };
    }),

  frase: '',
  setFrase: (frase: string) => set({ frase }),
}));
