'use client';

import { InventarioList } from './InventarioList';
import { FormularioProducto } from './FormularioProducto';
import { Producto } from '@/src/interface/Producto';
import { useProductoStore } from '@/src/store/producto.store';
import { BuscadorProductos } from './BuscadorProductos';
import { Rubro } from '@/src/interface/Rubro';
import { useRouter } from 'next/navigation';
import { SubRubro } from '@/src/interface/SubRubro';
import { FiEye, FiEyeOff, FiFolder, FiGrid, FiPackage, FiRotateCcw } from 'react-icons/fi';

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
  mostrarDesactivados?: boolean;
}

export const InventarioContainer = ({
  limit,
  productos,
  search,
  totalPages,
  currentPage,
  totalProductos,
  rubros,
  subRubros,
  rubroSeleccionado,
  subRubroSeleccionado,
  mostrarDesactivados = false,
}: Props) => {
  const { productoSeleccionado } = useProductoStore();
  const router = useRouter();

  const handleRubro = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const params = new URLSearchParams(window.location.search);
    if (val && val !== '0') {
      params.set('rubro', val);
    } else {
      params.delete('rubro');
    }
    params.delete('subrubro');
    params.set('page', '1');
    router.push(`/admin/inventario?${params.toString()}`);
  };

  const handleSubRubro = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const params = new URLSearchParams(window.location.search);
    if (val && val !== '0') {
      params.set('subrubro', val);
    } else {
      params.delete('subrubro');
    }
    params.set('page', '1');
    router.push(`/admin/inventario?${params.toString()}`);
  };

  const handleToggleDesactivados = () => {
    const params = new URLSearchParams(window.location.search);
    if (!mostrarDesactivados) {
      params.set('desactivados', 'true');
    } else {
      params.delete('desactivados');
    }
    params.set('page', '1');
    router.push(`/admin/inventario?${params.toString()}`);
  };

  const handleClearAllFilters = () => {
    router.push('/admin/inventario');
  };

  const hasActiveFilters = Boolean(
    rubroSeleccionado || subRubroSeleccionado || mostrarDesactivados || search
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 w-full items-start">
      <div className="flex-1 flex flex-col min-w-0 w-full">
        {/* Header con diseño elevado siguiendo craft foundations */}
        <header className="mb-6 flex flex-col gap-5 w-full bg-white p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          {/* Fila superior: Título, Badge de stats y Toggle de Desactivados */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#0096B1] shrink-0 shadow-xs">
                <FiPackage className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Inventario General</h1>
                  <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-slate-100 text-slate-600 border border-slate-200/80">
                    {totalProductos} {totalProductos === 1 ? 'producto' : 'productos'}
                  </span>
                </div>
                <p className="text-slate-500 text-xs md:text-sm mt-0.5 font-medium">
                  Gestiona el catálogo, stock, precios y visibilidad de tus productos.
                </p>
              </div>
            </div>

            {/* Switch interactivo personalizado para "Productos Desactivados" */}
            <button
              type="button"
              onClick={handleToggleDesactivados}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                mostrarDesactivados
                  ? 'bg-amber-50/90 text-amber-900 border-amber-200 shadow-xs hover:bg-amber-100/80 ring-2 ring-amber-500/10'
                  : 'bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100 hover:text-slate-900'
              }`}
              title="Filtrar estado de productos"
            >
              <div className={`w-8 h-4.5 rounded-full transition-colors relative flex items-center px-0.5 ${
                mostrarDesactivados ? 'bg-amber-500' : 'bg-slate-300'
              }`}>
                <div className={`w-3.5 h-3.5 rounded-full bg-white shadow-xs transform transition-transform ${
                  mostrarDesactivados ? 'translate-x-3.5' : 'translate-x-0'
                }`} />
              </div>
              {mostrarDesactivados ? (
                <span className="flex items-center gap-1.5 font-semibold">
                  <FiEyeOff className="w-4 h-4 text-amber-600" />
                  Productos Desactivados
                </span>
              ) : (
                <span className="flex items-center gap-1.5 font-semibold">
                  <FiEye className="w-4 h-4 text-slate-400" />
                  Ver Desactivados
                </span>
              )}
            </button>
          </div>

          {/* Fila de Controles de Filtro: Rubros, Subrubros y Limpiar Filtros */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center flex-1">
              {/* Selector de Rubros */}
              <div className="flex items-center gap-2.5 bg-slate-50/70 border border-slate-200/80 rounded-xl px-3.5 py-1.5 focus-within:ring-2 focus-within:ring-[#0096B1]/20 focus-within:border-[#0096B1] transition-all flex-1 min-w-45">
                <FiFolder className="w-4 h-4 text-slate-400 shrink-0" />
                <div className="flex flex-col w-full">
                  <label htmlFor="rubros" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-0.5">
                    Rubro
                  </label>
                  <select
                    name="rubros"
                    id="rubros"
                    value={rubroSeleccionado || ''}
                    onChange={handleRubro}
                    className="w-full bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer"
                  >
                    <option value="">Todos los rubros</option>
                    {rubros.map((rubro) => (
                      <option key={rubro.id} value={rubro.id}>
                        {rubro.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Selector de Subrubros */}
              <div className="flex items-center gap-2.5 bg-slate-50/70 border border-slate-200/80 rounded-xl px-3.5 py-1.5 focus-within:ring-2 focus-within:ring-[#0096B1]/20 focus-within:border-[#0096B1] transition-all flex-1 min-w-45">
                <FiGrid className="w-4 h-4 text-slate-400 shrink-0" />
                <div className="flex flex-col w-full">
                  <label htmlFor="subrubros" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-0.5">
                    Sub rubro
                  </label>
                  <select
                    name="subrubros"
                    id="subrubros"
                    value={subRubroSeleccionado || ''}
                    onChange={handleSubRubro}
                    className="w-full bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer"
                  >
                    <option value="">Todos los sub rubros</option>
                    {subRubros.map((subrubro) => (
                      <option key={subrubro.id_subrubro} value={subrubro.id_subrubro}>
                        {subrubro.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Botón Reset de filtros */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearAllFilters}
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100/70 hover:bg-slate-200/60 rounded-xl transition-all border border-slate-200/60 cursor-pointer shrink-0"
              >
                <FiRotateCcw className="w-3.5 h-3.5" />
                Limpiar filtros
              </button>
            )}
          </div>
        </header>

        {/* Main Content - List */}
        <section className="w-full">
          <div className="flex flex-col gap-2">
            <BuscadorProductos rubro={rubroSeleccionado} subrubro={subRubroSeleccionado} desactivados={mostrarDesactivados} />
            <InventarioList
              search={search}
              limit={limit}
              rubro={rubroSeleccionado}
              subrubro={subRubroSeleccionado}
              productos={productos || []}
              totalPages={totalPages}
              currentPage={currentPage}
              totalProductos={totalProductos}
            />
          </div>
        </section>
      </div>

      {/* Sidebar - Form */}
      {productoSeleccionado && (
        <aside className="w-full lg:w-120 shrink-0 lg:sticky lg:top-3">
          <FormularioProducto />
        </aside>
      )}
    </div>
  );
};
