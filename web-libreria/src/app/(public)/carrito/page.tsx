"use client";

import { ListCarritoItems } from "@/src/components/carrito/ListCarritoItems";
import { ResumenCarrito } from "@/src/components/carrito/ResumenCarrito";
import { useCarritoStore } from "@/src/store/carrito.store";

const CarritoPage = () => {
  const { productos } = useCarritoStore();
  const itemCount = productos.length;

  return (
    <main className="bg-slate-50 min-h-screen w-full flex flex-col md:flex-row px-4 md:px-12 py-8 gap-8">
      <section className="flex-1">
        <header className="flex justify-between items-end mb-6">
          <h1 className="text-slate-900 text-3xl font-bold tracking-tight">
            Tu Carrito de Compras
          </h1>
          <span className="text-slate-500 font-medium text-sm mb-1">
            {itemCount} {itemCount === 1 ? "Artículo" : "Artículos"}
          </span>
        </header>

        <ListCarritoItems />
      </section>

      <section className="w-full md:w-80">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm sticky top-8">
          <ResumenCarrito />
        </div>
      </section>

    </main>
  );
};

export default CarritoPage;
