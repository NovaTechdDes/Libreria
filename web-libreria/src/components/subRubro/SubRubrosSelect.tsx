'use client';

import { SubRubro } from '@/src/interface/SubRubro';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  subRubros: SubRubro[];
  subRubroActivo: number;
}

export const SubRubrosSelect = ({ subRubros, subRubroActivo }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = Number(e.target.value);
    const params = new URLSearchParams(searchParams.toString());
    if (val === 0) {
      params.delete('subrubro');
    } else {
      params.set('subrubro', val.toString());
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="relative w-full max-w-sm">
      <select
        value={subRubroActivo || 0}
        onChange={handleChange}
        className="w-full appearance-none pl-4 pr-10 py-3 text-sm font-semibold bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-sm text-secondary dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 cursor-pointer hover:border-gray-300 dark:hover:border-slate-700"
      >
        {subRubros.map((sub) => (
          <option key={sub.id_subrubro} value={sub.id_subrubro} className="py-2 bg-white dark:bg-slate-900 text-secondary dark:text-gray-100">
            {sub.nombre}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-secondary dark:text-gray-400">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};
