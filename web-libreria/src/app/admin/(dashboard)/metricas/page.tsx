'use client';

import { useState } from 'react';
import { FiTrendingUp, FiCalendar, FiChevronDown } from 'react-icons/fi';
import { DateRange } from '@/src/helper/date-range';
import { BsPeople } from 'react-icons/bs';
import { useMetrica } from '@/src/hooks/metrica/useMetrica';
import { Loading } from '@/src/components/ui/Loading';
import { useProductosMasVistos } from '@/src/hooks/producto_visto/useProductoVisto';
import { ProductoVistosItem } from '@/src/components/productoVistos/ProductoVistosItem';

interface FilterOption {
  id: DateRange;
  label: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { id: 'today', label: 'Hoy' },
  { id: 'week', label: 'Últimos 7 días' },
  { id: '30days', label: 'Últimos 30 días' },
  { id: 'month', label: 'Este mes' },
  { id: 'year', label: 'Este año' },
  { id: 'custom', label: 'Personalizado' },
];

const PREVIOUS_LABELS: Record<DateRange, string> = {
  today: 'vs. ayer',
  week: 'vs. 7 días anteriores',
  '30days': 'vs. 30 días anteriores',
  month: 'vs. mes anterior',
  year: 'vs. año anterior',
  custom: 'vs. período anterior',
};

const MetricasPage = () => {
  const [activeRange, setActiveRange] = useState<DateRange>('today');

  const { data: metricas, isLoading } = useMetrica(activeRange);
  const { data: productosVistos, isLoading: isLoadingProductosVistos } = useProductosMasVistos(new Date());

  const currentVisitors = metricas?.current?.visitors ?? metricas?.data?.visitors ?? 0;
  const previousVisitors = metricas?.previous?.visitors ?? 0;

  const calculateComparison = (current: number, previous: number) => {
    if (previous === 0) {
      if (current > 0) return { percent: 100, isUp: true, isNeutral: false };
      return { percent: 0, isUp: true, isNeutral: true };
    }
    const diff = ((current - previous) / previous) * 100;
    const rounded = Math.abs(Math.round(diff * 10) / 10);
    return {
      percent: rounded,
      isUp: diff > 0,
      isNeutral: diff === 0,
    };
  };

  const { percent, isUp, isNeutral } = calculateComparison(currentVisitors, previousVisitors);
  const previousLabel = PREVIOUS_LABELS[activeRange];

  const handleRangeChange = (range: DateRange) => {
    setActiveRange(range);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* HEADER DE MÉTRICAS */}
      <header className="space-y-6">
        {/* Fila Superior: Título + Selector de Fecha */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Título e Icono */}
          <div className="flex items-center gap-3">
            <FiTrendingUp className="w-7 h-7 text-emerald-500 shrink-0" />
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Métricas</h1>
              <p className="text-sm text-slate-500 mt-0.5">Resumen de visitas y actividad de tu sitio web</p>
            </div>
          </div>

          {/* Botón Indicador de Rango de Fechas */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 shadow-sm hover:border-slate-300 transition-all cursor-pointer">
            <FiCalendar className="w-4 h-4 text-slate-400" />
            <span>1 – 31 de mayo de 2024</span>
            <FiChevronDown className="w-4 h-4 text-slate-400 ml-1" />
          </div>
        </div>

        {/* Fila Inferior: Tabs de Filtros (Segmented Control) */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-1.5 flex flex-wrap sm:flex-nowrap items-center justify-between shadow-xs gap-1">
          {FILTER_OPTIONS.map((filter) => {
            const isActive = activeRange === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => handleRangeChange(filter.id)}
                className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all text-center whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-50/70 text-emerald-600 font-semibold border border-emerald-100/80 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 border border-transparent'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* METRICAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center gap-4.5 hover:shadow-md transition-shadow">
          {/* Contenedor del Icono */}
          <div className="w-14 h-14 bg-teal-50/80 rounded-2xl flex items-center justify-center shrink-0">
            <BsPeople className="w-7 h-7 text-teal-600" />
          </div>

          {/* Información y Datos */}
          <div className="space-y-0.5">
            <p className="text-sm font-medium text-slate-600">Visitantes únicos</p>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{currentVisitors}</h3>
            <p className="text-xs sm:text-sm font-medium flex items-center gap-1 mt-1">
              <span className={`font-semibold ${isNeutral ? 'text-slate-400' : isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                {isNeutral ? `0%` : isUp ? `↑ ${percent}%` : `↓ ${percent}%`}
              </span>
              <span className="text-slate-400">{previousLabel}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Tabla de productos más vistos */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Productos más vistos</h3>
            <p className="text-sm text-slate-500">Resumen de productos más vistos</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          {isLoadingProductosVistos ? (
            <Loading />
          ) : !productosVistos || productosVistos.length === 0 ? (
            <p className="text-sm text-slate-400 py-6 text-center">No hay productos vistos registrados en este período.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200/80 text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="px-4 py-3">Producto</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Precio</th>
                  <th className="px-4 py-3 text-right">Vistas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {productosVistos.map((elem, index) => (
                  <ProductoVistosItem key={elem.id_producto} elem={elem} index={index} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetricasPage;
