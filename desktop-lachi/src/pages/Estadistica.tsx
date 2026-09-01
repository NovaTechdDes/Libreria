import { FileText, FileSpreadsheet, Search, Calendar, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRubros } from '../hooks';
import { ChangeEvent, useMemo, useState } from 'react';
import { EstadisticaItem, Loading } from '../components';
import { useDetalleVenta } from '../hooks/useDetalleVenta';
import { DetalleVenta } from '../interface';
import { exportarEstadisticasPDF } from '../utils/generarPdf';

export const Estadistica = () => {
  const { data: rubros, isLoading: isLoadingRubros } = useRubros();

  const hoy = new Date().toISOString().substring(0, 10);
  const [desde, setDesde] = useState<string>(hoy);
  const [hasta, setHasta] = useState<string>(hoy);

  const [rubroId, setRubroId] = useState('');
  const [subRubroId, setSubRubroId] = useState('');

  const [desdeFiltro, setDesdeFiltro] = useState<string>(hoy);
  const [hastaFiltro, setHastaFiltro] = useState<string>(hoy);
  const [rubroFiltro, setRubroFiltro] = useState<string>('');
  const [subRubroFiltro, setSubRubroFiltro] = useState<string>('');

  const { data: detalles, isLoading: isLoadingDetalles } = useDetalleVenta(desdeFiltro, hastaFiltro, subRubroFiltro, rubroFiltro);

  console.log(detalles);

  //2. Filtramos los subrubros que corresponad al rubro seleccionado
  const subrubrosFiltrados = useMemo(() => {
    if (!rubroId) return [];
    return rubros?.subRubros.filter((sub) => sub.id_rubro_g.toString() === rubroId);
  }, [rubroId, rubros]);

  // 3. Manejar el cambio de Rubro
  const handleRubroChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nuevoRubroId = e.target.value;
    setRubroId(nuevoRubroId);
    setSubRubroId('');
  };

  const handleSearch = () => {
    setDesdeFiltro(desde);
    setHastaFiltro(hasta);
    setRubroFiltro(rubroId);
    setSubRubroFiltro(subRubroId);
  };

  return (
    <>
      {/* Encabezado */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-slate-200/80 dark:border-zinc-800/80 transition-colors">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">Reporte de Artículos Vendidos</h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">Control de stock y análisis de reposición</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => exportarEstadisticasPDF({ detalles, desde: desdeFiltro, hasta: hastaFiltro })}
            disabled={!detalles || detalles.length === 0}
            type="button"
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-200 border border-slate-200/90 dark:border-zinc-800 hover:bg-red-50/50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-950/20 dark:hover:text-red-400 dark:hover:border-red-900/40 shadow-2xs transition-all cursor-pointer active:scale-95"
          >
            <FileText className="w-4 h-4 text-red-500 dark:text-red-400" />
            <span>PDF</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-200 border border-slate-200/90 dark:border-zinc-800 hover:bg-emerald-50/50 hover:text-emerald-600 hover:border-emerald-200 dark:hover:bg-emerald-950/20 dark:hover:text-emerald-400 dark:hover:border-emerald-900/40 shadow-2xs transition-all cursor-pointer active:scale-95"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <span>Excel</span>
          </button>
        </div>
      </header>

      {/* Filtros */}
      <section className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-4 sm:p-5 shadow-xs mb-6 transition-colors">
        {isLoadingRubros ? (
          <Loading showText={false} size="xs" />
        ) : (
          <div className="flex flex-wrap items-end justify-between gap-4">
            {/* Bloque: Período */}
            <div className="flex flex-col gap-1.5 flex-1 min-w-65">
              <label className="text-[11px] font-bold tracking-wider text-slate-400 dark:text-zinc-500 uppercase flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                Período
              </label>

              <div className="flex items-center gap-2">
                <input
                  type="date"
                  name="desde"
                  id="desde"
                  value={desde.toString()}
                  onChange={(e) => setDesde(e.target.value)}
                  className="w-full bg-slate-50/80 dark:bg-zinc-950/70 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 text-xs sm:text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/80 transition-all"
                />
                <span className="text-slate-400 dark:text-zinc-600 font-medium text-xs sm:text-sm">-</span>
                <input
                  type="date"
                  name="hasta"
                  id="hasta"
                  value={hasta.toString()}
                  onChange={(e) => setHasta(e.target.value)}
                  className="w-full bg-slate-50/80 dark:bg-zinc-950/70 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 text-xs sm:text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/80 transition-all"
                />
              </div>
            </div>

            {/* Bloque: Categorización (Rubros y Sub Rubros) */}
            <div className="flex flex-wrap sm:flex-nowrap items-end gap-3 flex-2 min-w-75">
              <div className="flex flex-col gap-1.5 flex-1 min-w-35">
                <label htmlFor="rubro" className="text-[11px] font-bold tracking-wider text-slate-400 dark:text-zinc-500 uppercase flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-amber-500" />
                  Rubros
                </label>
                <select
                  name="rubro"
                  id="rubro"
                  value={rubroId}
                  onChange={handleRubroChange}
                  className="w-full bg-slate-50/80 dark:bg-zinc-950/70 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 text-xs sm:text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/80 transition-all cursor-pointer"
                >
                  <option value="">Rubro (Todos)</option>
                  {rubros?.rubro.map((rubro) => (
                    <option key={rubro.id_rubro_g} value={rubro.id_rubro_g}>
                      {rubro.nom_rubro_g}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5 flex-1 min-w-35">
                <label htmlFor="subrubro" className="text-[11px] font-bold tracking-wider text-slate-400 dark:text-zinc-500 uppercase">
                  Sub Rubros
                </label>
                <select
                  name="subrubro"
                  id="subrubro"
                  value={subRubroId}
                  onChange={(e) => setSubRubroId(e.target.value)}
                  disabled={!rubroId}
                  className="w-full bg-slate-50/80 dark:bg-zinc-950/70 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 text-xs sm:text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/80 transition-all cursor-pointer"
                >
                  <option value="">Sub-Rubro (Todos)</option>
                  {subrubrosFiltrados?.map((sub) => (
                    <option key={sub.id_rubro} value={sub.id_rubro}>
                      {sub.nom_rubro}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Botón Buscar */}
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                type="button"
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 dark:bg-amber-500 dark:hover:bg-amber-400 text-slate-950 font-semibold text-xs sm:text-sm px-5 py-2 rounded-xl shadow-md shadow-amber-500/15 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 border border-amber-400/30"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>Buscar</span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Tabla */}
      <main className="bg-white dark:bg-zinc-900 h-[60vh] border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-xs mb-6 transition-colors">
        {isLoadingDetalles ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loading text="Cargando detalles de ventas..." size="md" />
          </div>
        ) : (
          <div className="overflow-x-auto overflow-y-auto h-full">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 z-10 bg-slate-100 dark:bg-zinc-800 shadow-xs">
                <tr className="border-b border-slate-200/80 dark:border-zinc-700/80">
                  <th className="px-4 py-3.5 text-[11px] font-bold tracking-wider text-slate-500 dark:text-zinc-400 uppercase font-mono">Cod. Interno</th>
                  <th className="px-4 py-3.5 text-[11px] font-bold tracking-wider text-slate-500 dark:text-zinc-400 uppercase">Descripción</th>
                  <th className="px-4 py-3.5 text-[11px] font-bold tracking-wider text-slate-500 dark:text-zinc-400 uppercase text-right">Cant. Vendida</th>
                  <th className="px-4 py-3.5 text-[11px] font-bold tracking-wider text-slate-500 dark:text-zinc-400 uppercase text-right">Stock Actual</th>
                  <th className="px-4 py-3.5 text-[11px] font-bold tracking-wider text-slate-500 dark:text-zinc-400 uppercase text-right">Diferencia</th>
                  <th className="px-4 py-3.5 text-[11px] font-bold tracking-wider text-slate-500 dark:text-zinc-400 uppercase text-right">Precio Unit.</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60 text-xs sm:text-sm">
                {detalles && detalles.length > 0 ? (
                  detalles.map((item: DetalleVenta) => <EstadisticaItem key={item.codigo_articulo || item.id_venta} item={item} />)
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-slate-400 dark:text-zinc-500 font-medium">
                      No se encontraron artículos vendidos para los filtros seleccionados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Paginación */}
      <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl shadow-xs transition-colors">
        <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 font-medium">
          Mostrando <span className="font-semibold text-slate-700 dark:text-zinc-200 font-mono">1-5</span> de <span className="font-semibold text-slate-700 dark:text-zinc-200 font-mono">248</span>{' '}
          artículos
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="p-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 disabled:opacity-40 cursor-pointer transition-colors active:scale-95"
            aria-label="Página anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs sm:text-sm font-mono font-semibold text-slate-800 dark:text-zinc-200 px-3 py-1 rounded-lg bg-slate-50 dark:bg-zinc-950/60 border border-slate-200/60 dark:border-zinc-800/60">
            1 / 50
          </span>

          <button
            type="button"
            className="p-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 disabled:opacity-40 cursor-pointer transition-colors active:scale-95"
            aria-label="Página siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </>
  );
};
