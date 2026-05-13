'use client';

interface Props {
  activos: number;
  pausados: number;
}

export const BannerFilters = ({ activos = 0, pausados = 0 }: Props) => {
  return (
    <div className="flex items-center gap-6">
      <button className="flex items-center gap-2 group">
        <span className="text-sm font-bold text-teal-600 border-b-2 border-teal-500 pb-1">{activos} Activos</span>
      </button>
      <button className="flex items-center gap-2 group text-slate-400 hover:text-slate-600 transition-colors">
        <span className="text-sm font-bold">{pausados} Pausados</span>
      </button>
    </div>
  );
};
