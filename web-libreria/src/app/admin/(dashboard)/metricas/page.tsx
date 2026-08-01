'use client';

import React, { useEffect, useState } from 'react';
import { FiTrendingUp, FiCalendar, FiChevronDown } from 'react-icons/fi';
import { DateRange, getDateRange } from '@/src/helper/date-range';
import { BsPeople } from 'react-icons/bs';
import { useMetrica } from '@/src/hooks/metrica/useMetrica';
import { Loading } from '@/src/components/ui/Loading';

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

const MetricasPage = () => {
  const [activeRange, setActiveRange] = useState<DateRange>('today');

  const { data: metricas, isLoading } = useMetrica(activeRange);

  const { data: visit } = metricas || {};

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
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{visit?.visitors}</h3>
            <p className="text-xs sm:text-sm font-medium flex items-center gap-1 mt-1">
              <span className="text-emerald-500 font-semibold">↑ 18.3%</span>
              <span className="text-slate-400">vs. abril</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricasPage;
