'use client';
import { Color } from '@/src/interface/Color';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  colores: Color[];
}

export const HeaderColores = ({ colores }: Props) => {
  const [value, setValue] = useState('');

  const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.set('search', value);
    params.set('page', '1');

    router.push(`/admin/colores?${params.toString()}`);
  };

  return (
    <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
      <h2 className="text-slate-500 font-semibold text-sm">{colores?.length || 0} Colores registrados</h2>

      <form onSubmit={handleSearch} className="gap-2 flex items-center">
        <label htmlFor="buscador" className="text-slate-500 font-semibold text-sm">
          Buscador
        </label>
        <input
          type="text"
          name="value"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          id="buscador"
          placeholder="Buscar color por nombre..."
          className="border-2 border-slate-200 rounded-2xl px-4 py-2 text-black placeholder:text-slate-400"
        />
      </form>
    </div>
  );
};
