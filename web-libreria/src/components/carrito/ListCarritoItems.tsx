"use client";

import { useCarritoStore } from "@/src/store/carrito.store";
import { CarritoItem } from "./CarritoItem";

export const ListCarritoItems = () => {
  const { productos } = useCarritoStore();

  if (productos.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm">
        <p className="text-slate-500 text-lg">Tu carrito está vacío.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="divide-y divide-slate-100">
        {productos.map((producto) => (
          <CarritoItem key={producto.producto.id_articulo} producto={producto} />
        ))}
      </div>
    </div>
  );
};

