import { create } from 'zustand';
import { Producto } from '../interface/Producto';
import { Color } from '../interface/Color';

export interface ProductosCarrito {
  cantidad: number;
  producto: Producto;
  color?: Color | null;
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
  agregarProducto: (producto: Producto, cantidad: number, color: Color | null) => void;
  actualizarCantidad: (id: number, cantidad: number) => void;
  removerProducto: (id: number) => void;
}

export const useCarritoStore = create<CarritoStore>((set) => ({
  total: 0,
  subtotal: 0,
  productos: [],

  agregarProducto: (producto: Producto, cantidad: number, color: Color | null) =>
    set((state) => {
      const productoExiste = state.productos.find((p) => p.color?.id === color?.id && p.producto.id_producto === producto.id_producto);

      if (productoExiste) {
        const nuevosProductos = state.productos.map((p) => (p.producto.id_producto === producto.id_producto && p.color?.id === color?.id ? { ...p, cantidad: p.cantidad + cantidad } : p));

        const subtotal = state.productos.reduce((acc, p) => acc + p.producto.precio * p.cantidad, 0);
        const total = subtotal - (subtotal * state.descuento) / 100;

        return { productos: nuevosProductos, total, subtotal };
      }

      const subtotal = state.productos.reduce((acc, p) => acc + p.producto.precio * p.cantidad, 0);
      const total = subtotal - (subtotal * state.descuento) / 100;

      return { productos: [...state.productos, { producto, cantidad, color }], total, subtotal };
    }),
  actualizarCantidad: (id: number, cantidad: number) =>
    set((state) => {
      const nuevosProductos = state.productos.map((p) => (p.producto.id_producto === id ? { ...p, cantidad } : p));

      const subtotal = nuevosProductos.reduce((acc, p) => acc + p.producto.precio * p.cantidad, 0);
      const total = subtotal - (subtotal * state.descuento) / 100;

      return { productos: nuevosProductos, total, subtotal };
    }),
  removerProducto: (id: number) =>
    set((state) => {
      const nuevosProductos = state.productos.filter((p) => p.producto.id_producto !== id);
      const subtotal = nuevosProductos.reduce((acc, p) => acc + p.producto.precio * p.cantidad, 0);
      const total = subtotal - (subtotal * state.descuento) / 100;

      return { productos: nuevosProductos, total, subtotal };
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
