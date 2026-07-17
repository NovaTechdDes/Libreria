import { Color } from '../interface/Color';
import { create } from 'zustand';
import { persist } from "zustand/middleware";
import { Producto } from '../interface/Producto';
import { productos_variantes } from '../interface/Variantes';

export interface ProductosCarrito {
  cantidad: number;
  producto: Producto;
  color?: Color | null;
  observacion?: string;
  variante: productos_variantes | null;
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

  inicio: string;
  fin: string;
  setInicio: (inicio: string) => void;
  setFin: (fin: string) => void;

  productos: ProductosCarrito[];
  agregarProducto: (producto: Producto, cantidad: number, color: Color | null, variante: productos_variantes | null) => void;
  actualizarCantidad: (id: number, cantidad: number) => void;
  removerProducto: (id: number) => void;

  guardadoEn?: number;
}

export const useCarritoStore = create<CarritoStore>()(
  persist(
    (set) => ({
      total: 0,
      subtotal: 0,
      productos: [],

      inicio: '',
      fin: '',
      setInicio: (inicio: string) => set({ inicio }),
      setFin: (fin: string) => set({ fin }),

      agregarProducto: (producto: Producto, cantidad: number, color: Color | null, variante: productos_variantes | null) =>
        set((state) => {
          const productoExiste = state.productos.find((p) =>
            p.color?.id === color?.id
            && p.producto.id_producto === producto.id_producto
            && p.variante?.id === variante?.id
          );

          if (productoExiste) {
            const nuevosProductos = state.productos.map((p) => (
              p.producto.id_producto === producto.id_producto
                && p.color?.id === color?.id
                && p.variante?.id === variante?.id ? { ...p, cantidad: p.cantidad + cantidad } : p));

            const subtotal = state.productos.reduce((acc, p) => acc + (p.producto.isvisibleprecio ? p.producto.precio : 0) * p.cantidad, 0);
            const total = subtotal - (subtotal * state.descuento) / 100;

            return { productos: nuevosProductos, total, subtotal };
          }

          const subtotal = state.productos.reduce((acc, p) => acc + p.producto.precio * p.cantidad, 0);
          const total = subtotal - (subtotal * state.descuento) / 100;

          return { productos: [...state.productos, { producto, cantidad, color, variante }], total, subtotal };
        }),

      actualizarCantidad: (id: number, cantidad: number) =>
        set((state) => {
          const nuevosProductos = state.productos.map((p) => (p.producto.id_producto === id ? { ...p, cantidad } : p));

          const subtotal = nuevosProductos.reduce((acc, p) => acc + (p.producto.isvisibleprecio ? p.producto.precio : 0) * p.cantidad, 0);
          const total = subtotal - (subtotal * state.descuento) / 100;

          return { productos: nuevosProductos, total, subtotal };
        }),

      removerProducto: (id: number) =>
        set((state) => {
          const nuevosProductos = state.productos.filter((p) => p.producto.id_producto !== id);
          const subtotal = nuevosProductos.reduce((acc, p) => acc + (p.producto.isvisibleprecio ? p.producto.precio : 0) * p.cantidad, 0);
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
    }),
  {
    name: 'carrito.storage',
    storage: {
      getItem: (name) => {
        const str = localStorage.getItem(name);
        if (!str) return null;
        const data = JSON.parse(str);

        //Verificamos si existe la propiedad de fecha de guardado
        if(data.state && data.state.guardadoEn){
          const tresHoras = 3 * 60 * 60 * 1000;
          const tiempoTranscurrido = Date.now() - data.state.guardadoEn;

          if(tiempoTranscurrido > tresHoras){
            //Si expiro, borramos el storage y retornamos null
            localStorage.removeItem(name);
            return null;
          }
        }
        return data;
      },
      setItem: (name, value) => {
        // Añadimos la marca de tiempo actual al estado antes de guardarlo
        value.state.guardadoEn = Date.now();
        localStorage.setItem(name, JSON.stringify(value));
      },
      removeItem: (name) => {
        // Eliminamos el item
        localStorage.removeItem(name);
      }
    }
  }
));
