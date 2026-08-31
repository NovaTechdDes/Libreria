import { FileText, FileSpreadsheet, Search, Calendar, Filter, ChevronLeft, ChevronRight } from "lucide-react";

export const Estadistica = () => {
  return (
    <>
      {/* Encabezado */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-slate-200/80 dark:border-zinc-800/80 transition-colors">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
            Reporte de Artículos Vendidos
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">
            Control de stock y análisis de reposición
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
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
        <div className="flex flex-wrap items-end justify-between gap-4">
          
          {/* Bloque: Período */}
          <div className="flex flex-col gap-1.5 flex-1 min-w-[260px]">
            <label className="text-[11px] font-bold tracking-wider text-slate-400 dark:text-zinc-500 uppercase flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              Período
            </label>

            <div className="flex items-center gap-2">
              <input
                type="date"
                name="desde"
                id="desde"
                className="w-full bg-slate-50/80 dark:bg-zinc-950/70 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 text-xs sm:text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/80 transition-all"
              />
              <span className="text-slate-400 dark:text-zinc-600 font-medium text-xs sm:text-sm">-</span>
              <input
                type="date"
                name="hasta"
                id="hasta"
                className="w-full bg-slate-50/80 dark:bg-zinc-950/70 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 text-xs sm:text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/80 transition-all"
              />
            </div>
          </div>

          {/* Bloque: Categorización (Rubros y Sub Rubros) */}
          <div className="flex flex-wrap sm:flex-nowrap items-end gap-3 flex-2 min-w-[300px]">
            <div className="flex flex-col gap-1.5 flex-1 min-w-[140px]">
              <label htmlFor="rubro" className="text-[11px] font-bold tracking-wider text-slate-400 dark:text-zinc-500 uppercase flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-amber-500" />
                Rubros
              </label>
              <select
                name="rubro"
                id="rubro"
                className="w-full bg-slate-50/80 dark:bg-zinc-950/70 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 text-xs sm:text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/80 transition-all cursor-pointer"
              >
                <option value="">Rubro (Todos)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5 flex-1 min-w-[140px]">
              <label htmlFor="subrubro" className="text-[11px] font-bold tracking-wider text-slate-400 dark:text-zinc-500 uppercase">
                Sub Rubros
              </label>
              <select
                name="subrubro"
                id="subrubro"
                className="w-full bg-slate-50/80 dark:bg-zinc-950/70 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 text-xs sm:text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/80 transition-all cursor-pointer"
              >
                <option value="">Sub-Rubro (Todos)</option>
              </select>
            </div>
          </div>

          {/* Botón Buscar */}
          <div className="flex items-end">
            <button
              type="button"
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 dark:bg-amber-500 dark:hover:bg-amber-400 text-slate-950 font-semibold text-xs sm:text-sm px-5 py-2 rounded-xl shadow-md shadow-amber-500/15 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 border border-amber-400/30"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>Buscar</span>
            </button>
          </div>

        </div>
      </section>

      {/* Tabla */}
      <main className="bg-white dark:bg-zinc-900 h-[60vh] border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-xs mb-6 transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/70 dark:bg-zinc-800/50 border-b border-slate-200/80 dark:border-zinc-800">
                <th className="px-4 py-3.5 text-[11px] font-bold tracking-wider text-slate-500 dark:text-zinc-400 uppercase font-mono">
                  Cod. Interno
                </th>
                <th className="px-4 py-3.5 text-[11px] font-bold tracking-wider text-slate-500 dark:text-zinc-400 uppercase">
                  Descripción
                </th>
                <th className="px-4 py-3.5 text-[11px] font-bold tracking-wider text-slate-500 dark:text-zinc-400 uppercase text-right">
                  Cant. Vendida
                </th>
                <th className="px-4 py-3.5 text-[11px] font-bold tracking-wider text-slate-500 dark:text-zinc-400 uppercase text-right">
                  Stock Actual
                </th>
                <th className="px-4 py-3.5 text-[11px] font-bold tracking-wider text-slate-500 dark:text-zinc-400 uppercase text-right">
                  Diferencia
                </th>
                <th className="px-4 py-3.5 text-[11px] font-bold tracking-wider text-slate-500 dark:text-zinc-400 uppercase text-right">
                  Precio Unit.
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60 text-xs sm:text-sm">
              {/* Fila 1 */}
              <tr className="hover:bg-slate-50/70 dark:hover:bg-zinc-800/40 transition-colors">
                <td className="px-4 py-3.5 font-mono font-bold text-slate-900 dark:text-zinc-100">
                  PRD-8421
                </td>
                <td className="px-4 py-3.5 font-medium text-slate-800 dark:text-zinc-200">
                  Laptop ThinkPad T14 Gen 3
                </td>
                <td className="px-4 py-3.5 text-right font-mono text-slate-700 dark:text-zinc-300">
                  45
                </td>
                <td className="px-4 py-3.5 text-right font-mono text-slate-700 dark:text-zinc-300">
                  128
                </td>
                <td className="px-4 py-3.5 text-right font-mono font-semibold text-slate-600 dark:text-zinc-400">
                  75
                </td>
                <td className="px-4 py-3.5 text-right font-mono font-medium text-slate-900 dark:text-zinc-100">
                  $ 1,450.00
                </td>
              </tr>

              {/* Fila 2 */}
              <tr className="hover:bg-slate-50/70 dark:hover:bg-zinc-800/40 transition-colors">
                <td className="px-4 py-3.5 font-mono font-bold text-slate-900 dark:text-zinc-100">
                  PRD-9833
                </td>
                <td className="px-4 py-3.5 font-medium text-red-600 dark:text-red-400">
                  Monitor Dell UltraSharp 27"
                </td>
                <td className="px-4 py-3.5 text-right font-mono text-slate-700 dark:text-zinc-300">
                  82
                </td>
                <td className="px-4 py-3.5 text-right font-mono font-bold text-red-600 dark:text-red-400">
                  15
                </td>
                <td className="px-4 py-3.5 text-right font-mono font-bold text-red-600 dark:text-red-400">
                  -67
                </td>
                <td className="px-4 py-3.5 text-right font-mono font-medium text-slate-900 dark:text-zinc-100">
                  $ 420.00
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      {/* Paginación */}
      <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl shadow-xs transition-colors">
        <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 font-medium">
          Mostrando <span className="font-semibold text-slate-700 dark:text-zinc-200 font-mono">1-5</span> de{" "}
          <span className="font-semibold text-slate-700 dark:text-zinc-200 font-mono">248</span> artículos
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
