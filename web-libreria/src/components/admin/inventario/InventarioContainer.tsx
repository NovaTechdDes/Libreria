'use client';

import { InventarioList } from './InventarioList';
import { FormularioProducto } from './FormularioProducto';
import { Producto } from '@/src/interface/Producto';
import { useProductoStore } from '@/src/store/producto.store';
import { BuscadorProductos } from './BuscadorProductos';

interface Props {
  productos: Producto[];
  totalPages: number;
  currentPage: number;
  totalProductos: number;
  limit: number;
}

export const InventarioContainer = ({ limit, productos, totalPages, currentPage, totalProductos }: Props) => {
  const { productoSeleccionado } = useProductoStore();


  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 w-full items-start">
      <div className="flex-1 flex flex-col min-w-0 w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Inventario General</h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">Gestiona el stock, precios y visibilidad de tus productos.</p>
        </div>
        
        {/* Main Content - List */}
        <section className="w-full">
          <div className="flex flex-col gap-2">
            <BuscadorProductos />
            <InventarioList limit={limit} productos={productos || []} totalPages={totalPages} currentPage={currentPage} totalProductos={totalProductos} />
          </div>
        </section>
      </div>

      {/* Sidebar - Form */}
      {productoSeleccionado && (
        <aside className="w-full lg:w-[480px] shrink-0 lg:sticky lg:top-3">
          <FormularioProducto />
        </aside>
      )}
    </div>
  );
};
