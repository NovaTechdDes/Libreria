'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

interface Props {
  rubro?: number;
  subrubro?: number;
  desactivados?: boolean;
}

export const BuscadorProductos = ({ rubro, subrubro, desactivados }: Props) => {
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get('search') || '';
  const [value, setValue] = useState(currentSearch);

  useEffect(() => {
    setValue(currentSearch);
  }, [currentSearch]);

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    if (value.trim()) {
      params.set('search', value.trim());
    } else {
      params.delete('search');
    }
    if (rubro) params.set('rubro', rubro.toString());
    if (subrubro) params.set('subrubro', subrubro.toString());
    if (desactivados) params.set('desactivados', 'true');
    params.set('page', '1');

    router.push(`/admin/inventario?${params.toString()}`);
  };

  const handleClear = () => {
    setValue('');
    const params = new URLSearchParams(window.location.search);
    params.delete('search');
    params.set('page', '1');
    router.push(`/admin/inventario?${params.toString()}`);
  };

  return (
    <div className="w-full mb-2">
      <form onSubmit={handleSearch} className="relative flex items-center w-full">
        <div className="absolute left-4 text-slate-400 pointer-events-none flex items-center">
          <FiSearch className="w-4.5 h-4.5" />
        </div>
        <input
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder="Buscar producto por nombre o código..."
          className="w-full pl-11 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0096B1]/20 focus:border-[#0096B1] transition-all shadow-xs hover:border-slate-300"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            title="Limpiar búsqueda"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </form>
    </div>
  );
};
