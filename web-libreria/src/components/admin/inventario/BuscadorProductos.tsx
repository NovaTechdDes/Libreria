import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const BuscadorProductos = () => {
  const [value, setValue] = useState('');

  const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('search', value);
    params.set('page', '1');

    router.push(`/admin/inventario?${params.toString()}`);
  };
  return (
    <div className="flex flex-col w-full  justify-between mb-4">
      <h3 className="text-xl font-bold text-slate-800">Lista de Productos</h3>

      <form onSubmit={handleSearch} className="flex w-full">
        <input
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder="Buscar por nombre..."
          className="px-5 w-full py-2.5 rounded-2xl border border-slate-400 text-slate-600 font-bold text-[14px] hover:bg-slate-50 transition-all"
        />
      </form>
    </div>
  );
};
