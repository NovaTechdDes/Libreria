'use client';

import { InventarioList } from './InventarioList';
import { FormularioProducto } from './FormularioProducto';
import { Producto } from '@/src/interface/Producto';
import { useProductoStore } from '@/src/store/producto.store';
import { BuscadorProductos } from './BuscadorProductos';
import { Rubro } from '@/src/interface/Rubro';
import { useRouter } from 'next/navigation';
import { SubRubro } from '@/src/interface/SubRubro';

interface Props {
  productos: Producto[];
  totalPages: number;
  currentPage: number;
  totalProductos: number;
  limit: number;

  search: string;

  rubros: Rubro[];
  subRubros: SubRubro[];

  rubroSeleccionado?: number;
  subRubroSeleccionado?: number;
}

export const InventarioContainer = ({ limit, productos, search, totalPages, currentPage, totalProductos, rubros, subRubros, rubroSeleccionado, subRubroSeleccionado }: Props) => {
  
  const { productoSeleccionado } = useProductoStore();
  const router = useRouter()

  const handleRubro = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`/admin/inventario?rubro=${e.target.value}`);
  }
  
  const handleSubRubro = (e: React.ChangeEvent<HTMLSelectElement>) => {
    
    router.push(`/admin/inventario?rubro=${rubroSeleccionado}&subrubro=${e.target.value}`);
  }


  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 w-full items-start">
      <div className="flex-1 flex flex-col min-w-0 w-full">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-6 w-full">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Inventario General</h1>
            <p className="text-slate-500 mt-1 font-medium text-sm">Gestiona el stock, precios y visibilidad de tus productos.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-stretch sm:items-center">
            <div className="flex flex-col min-w-[180px]">
              <label htmlFor="rubros" className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">
                Rubros
              </label>
              <div className="relative w-full">
                <select
                  name="rubros"
                  id="rubros"
                  value={rubroSeleccionado}
                  onChange={handleRubro}
                  className="w-full appearance-none pl-3.5 pr-10 py-2.5 text-sm font-semibold bg-white border border-slate-200 rounded-xl shadow-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 cursor-pointer hover:border-slate-300"
                >
                  {rubros.map(rubro => (
                    <option key={rubro.id} value={rubro.id}>
                      {rubro.nombre}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col min-w-[180px]">
              <label htmlFor="subrubros" className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">
                Sub rubros
              </label>
              <div className="relative w-full">
                <select
                  name="subrubros"
                  id="subrubros"
                  value={subRubroSeleccionado}
                  onChange={handleSubRubro}
                  className="w-full appearance-none pl-3.5 pr-10 py-2.5 text-sm font-semibold bg-white border border-slate-200 rounded-xl shadow-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 cursor-pointer hover:border-slate-300"
                >
                  {subRubros.map(subrubro => (
                    <option key={subrubro.id_subrubro} value={subrubro.id_subrubro}>
                      {subrubro.nombre}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content - List */}
        <section className="w-full">
          <div className="flex flex-col gap-2">
<<<<<<< HEAD
            <BuscadorProductos rubro={rubroSeleccionado} subrubro={subRubroSeleccionado} />
            <InventarioList rubro={rubroSeleccionado}  subrubro={subRubroSeleccionado} search={search} limit={limit} productos={productos || []} totalPages={totalPages} currentPage={currentPage} totalProductos={totalProductos} />
=======
            <BuscadorProductos />
            <InventarioList limit={limit} rubro={rubroSeleccionado} subrubro={subRubroSeleccionado}  productos={productos || []} totalPages={totalPages} currentPage={currentPage} totalProductos={totalProductos} />
>>>>>>> dev
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
