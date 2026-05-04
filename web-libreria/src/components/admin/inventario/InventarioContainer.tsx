'use client';

import { FiPackage, FiEye, FiBox } from 'react-icons/fi';
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
}

export const InventarioContainer = ({ productos, totalPages, currentPage, totalProductos }: Props) => {
  const { productoSeleccionado } = useProductoStore();

  const stats = [
    {
      label: 'Total de productos',
      value: productos?.length || 0,
      icon: FiPackage,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Visibles en tienda',
      value: productos?.filter((p) => p.activo).length || 0,
      icon: FiEye,
      color: 'text-teal-600',
      bg: 'bg-teal-50',
    },
    {
      label: 'Categorías',
      value: Array.from(new Set(productos?.map((p) => p.id_rubro))).length || 0,
      icon: FiBox,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <header className="mb-10">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Inventario General</h2>
        <p className="text-slate-500 mt-1 font-medium">Gestiona el stock, precios y visibilidad de tus productos.</p>
      </header>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
              <div className={`${stat.bg} ${stat.color} p-4 rounded-xl`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[14px] font-bold text-slate-500 uppercase tracking-wide">{stat.label}</p>
                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </section>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Main Content - List */}
        <section className={`flex-1 transition-all duration-500 ${productoSeleccionado ? 'lg:w-2/3' : 'w-full'}`}>
          <BuscadorProductos />

          <InventarioList productos={productos || []} totalPages={totalPages} currentPage={currentPage} totalProductos={totalProductos} />
        </section>

        {/* Sidebar - Form */}
        {productoSeleccionado && (
          <aside className="w-full lg:w-[400px] shrink-0">
            <FormularioProducto />
          </aside>
        )}
      </div>
    </div>
  );
};
