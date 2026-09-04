import { FileText, FileSpreadsheet, Search, Calendar, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRubros } from '../hooks';
import { ChangeEvent, useMemo, useState } from 'react';
import { EstadisticaItem, Loading } from '../components';
import { useDetalleVenta } from '../hooks/useDetalleVenta';
import { DetalleVenta } from '../interface';
import { exportarEstadisticasPDF } from '../utils/generarPdf';
import { exportarEstadisticasExcel } from '../utils/generarExcel';

export const Estadistica = () => {
  const { data: rubros, isLoading: isLoadingRubros } = useRubros();

  const [search, setSearch] = useState<string>('');

  //Filtros
  const hoy = new Date().toISOString().substring(0, 10);
  const [desde, setDesde] = useState<string>(hoy);
  const [hasta, setHasta] = useState<string>(hoy);
  const [rubroId, setRubroId] = useState('');
  const [subRubroId, setSubRubroId] = useState('');

  //Para servidor
  const [desdeFiltro, setDesdeFiltro] = useState<string>(hoy);
  const [hastaFiltro, setHastaFiltro] = useState<string>(hoy);
  const [rubroFiltro, setRubroFiltro] = useState<string>('');
  const [subRubroFiltro, setSubRubroFiltro] = useState<string>('');

  //Paginacion
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 30;

  const { data: detalles, isLoading: isLoadingDetalles } = useDetalleVenta(desdeFiltro, hastaFiltro, subRubroFiltro, rubroFiltro);

  const detallesFiltrados = useMemo(() => {
    if (!search) return detalles;

    return detalles.filter((detalle: DetalleVenta) => {
      const term = search.toLocaleLowerCase();
      const codigoCoincide = detalle.codigo_articulo?.toString().toLowerCase().includes(term);
      const productoCoincide = detalle.producto?.toLowerCase().includes(term);

      return codigoCoincide || productoCoincide;
    });
  }, [detalles, search]);

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

  const indiceInicio = (paginaActual - 1) * elementosPorPagina;
  const indiceFin = indiceInicio + elementosPorPagina;

  const detallesPaginados = useMemo(() => {
    if (!detallesFiltrados) return [];
    return detallesFiltrados.slice(indiceInicio, indiceFin);
  }, [detallesFiltrados, indiceInicio, indiceFin]);

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPaginaActual(1);
  };

  const handleSearch = () => {
    setDesdeFiltro(desde);
    setHastaFiltro(hasta);
    setRubroFiltro(rubroId);
    setSubRubroFiltro(subRubroId);
    setPaginaActual(1);
  };

  const handleNextPage = () => {
    setPaginaActual((prev) => Math.min(prev + 1, totalPaginas));
  };

  const handlePrevPage = () => {
    setPaginaActual((prev) => Math.max(prev - 1, 1));
  };

  const totalElementos = detallesFiltrados?.length || 0;
  const totalPaginas = Math.max(1, Math.ceil(totalElementos / elementosPorPagina));

  return (
    <>
      {/* Encabezado */}
      <header className="flex mt-10 flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 mb-2 border-b border-slate-200/80 dark:border-zinc-800/80 transition-colors">
        {/* Título y Subtítulo */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">Reporte de Artículos Vendidos</h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-0.5">Control de stock y análisis de reposición</p>
        </div>

        {/* Acciones: Buscador + Botones de Exportación */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Input Buscador con Ícono integrado */}
          <div className="relative flex-1 sm:w-64 sm:flex-initial">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 pointer-events-none" />
            <input
              type="text"
              name="buscador"
              value={search}
              onChange={handleSearchInputChange}
              id="buscador"
              placeholder="Buscar por nombre o código..."
              className="w-full bg-slate-50/80 dark:bg-zinc-950/70 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 text-xs sm:text-sm rounded-xl pl-9 pr-3.5 py-2 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/80 placeholder:text-slate-400 dark:placeholder:text-zinc-600 transition-all"
            />
          </div>

          <div className="h-5 w-px bg-slate-200 dark:bg-zinc-800 hidden sm:block" />

          {/* Botones de Exportación */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => exportarEstadisticasPDF({ detalles: detallesFiltrados, desde: desdeFiltro, hasta: hastaFiltro })}
              disabled={!detallesFiltrados || detallesFiltrados.length === 0}
              type="button"
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-200 border border-slate-200/90 dark:border-zinc-800 hover:bg-red-50/50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-950/20 dark:hover:text-red-400 dark:hover:border-red-900/40 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xs transition-all cursor-pointer active:scale-95"
            >
              <FileText className="w-4 h-4 text-red-500 dark:text-red-400" />
              <span>PDF</span>
            </button>

            <button
              type="button"
              onClick={() => exportarEstadisticasExcel({ detalles: detallesFiltrados, desde: desdeFiltro, hasta: hastaFiltro })}
              disabled={!detallesFiltrados || detallesFiltrados.length === 0}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-200 border border-slate-200/90 dark:border-zinc-800 hover:bg-emerald-50/50 hover:text-emerald-600 hover:border-emerald-200 dark:hover:bg-emerald-950/20 dark:hover:text-emerald-400 dark:hover:border-emerald-900/40 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xs transition-all cursor-pointer active:scale-95"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <span>Excel</span>
            </button>
          </div>
        </div>
      </header>

      {/* Filtros */}
      <section className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-4 sm:p-5 shadow-xs mb-2 transition-colors">
        {isLoadingRubros ? (
          <Loading showText={false} size="xs" />
        ) : (
          <div className="flex flex-wrap items-end gap-3 sm:gap-4 w-full">
            {/* Bloque: Período */}
            <div className="flex flex-col gap-1.5 flex-1 min-w-67.5">
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
                  className="flex-1 min-w-0 w-full bg-slate-50/80 dark:bg-zinc-950/70 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 text-xs sm:text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/80 transition-all"
                />
                <span className="text-slate-400 dark:text-zinc-600 font-medium text-xs sm:text-sm shrink-0">-</span>
                <input
                  type="date"
                  name="hasta"
                  id="hasta"
                  value={hasta.toString()}
                  onChange={(e) => setHasta(e.target.value)}
                  className="flex-1 min-w-0 w-full bg-slate-50/80 dark:bg-zinc-950/70 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 text-xs sm:text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/80 transition-all"
                />
              </div>
            </div>

            {/* Bloque: Rubro */}
            <div className="flex flex-col gap-1.5 flex-1 min-w-40">
              <label htmlFor="rubro" className="text-[11px] font-bold tracking-wider text-slate-400 dark:text-zinc-500 uppercase flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-amber-500" />
                Rubros
              </label>
              <select
                name="rubro"
                id="rubro"
                value={rubroId}
                onChange={handleRubroChange}
                className="w-full min-w-0 bg-slate-50/80 dark:bg-zinc-950/70 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 text-xs sm:text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/80 transition-all cursor-pointer truncate"
              >
                <option value="">Rubro (Todos)</option>
                {rubros?.rubro.map((rubro) => (
                  <option key={rubro.id_rubro_g} value={rubro.id_rubro_g}>
                    {rubro.nom_rubro_g}
                  </option>
                ))}
              </select>
            </div>

            {/* Bloque: Sub Rubro */}
            <div className="flex flex-col gap-1.5 flex-1 min-w-40">
              <label htmlFor="subrubro" className="text-[11px] font-bold tracking-wider text-slate-400 dark:text-zinc-500 uppercase">
                Sub Rubros
              </label>
              <select
                name="subrubro"
                id="subrubro"
                value={subRubroId}
                onChange={(e) => setSubRubroId(e.target.value)}
                disabled={!rubroId}
                className="w-full min-w-0 bg-slate-50/80 dark:bg-zinc-950/70 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 text-xs sm:text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/80 transition-all cursor-pointer truncate disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Sub-Rubro (Todos)</option>
                {subrubrosFiltrados?.map((sub) => (
                  <option key={sub.id_rubro} value={sub.id_rubro}>
                    {sub.nom_rubro}
                  </option>
                ))}
              </select>
            </div>

            {/* Botón Buscar */}
            <div className="flex items-end shrink-0">
              <button
                onClick={handleSearch}
                type="button"
                className="h-9.5 px-4 bg-amber-500 hover:bg-amber-600 dark:bg-amber-500 dark:hover:bg-amber-400 text-slate-950 font-semibold text-xs sm:text-sm rounded-xl shadow-md shadow-amber-500/15 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 border border-amber-400/30"
                title="Buscar estadísticas"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Tabla */}
      <main className="bg-white dark:bg-zinc-900 h-[60vh] border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-xs mb-2 transition-colors">
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
                {detallesPaginados && detallesPaginados.length > 0 ? (
                  detallesPaginados.map((item: DetalleVenta) => <EstadisticaItem key={item.codigo_articulo || item.id_venta} item={item} />)
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
          Mostrando{' '}
          <span className="font-semibold text-slate-700 dark:text-zinc-200 font-mono">
            {totalElementos === 0 ? 0 : indiceInicio + 1} - {Math.min(indiceFin, totalElementos)} de {totalElementos} articulos
          </span>
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={paginaActual <= 1}
            className="p-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 disabled:opacity-40 cursor-pointer transition-colors active:scale-95"
            aria-label="Página anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs sm:text-sm font-mono font-semibold text-slate-800 dark:text-zinc-200 px-3 py-1 rounded-lg bg-slate-50 dark:bg-zinc-950/60 border border-slate-200/60 dark:border-zinc-800/60">
            {paginaActual} / {totalPaginas}
          </span>

          <button
            type="button"
            onClick={handleNextPage}
            disabled={paginaActual === totalPaginas || totalElementos === 0}
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
