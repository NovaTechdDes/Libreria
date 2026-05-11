import { ColoresContainer } from '@/src/components/admin/color/ColoresContainer';

import { createClient } from '@/src/lib/server';

import { IoAddOutline } from 'react-icons/io5';

interface Props {
  searchParams: {
    page: string;
    search: string;
  };
}

const ColoresPage = async ({ searchParams }: Props) => {
  const { page } = await searchParams;
  const supabase = await createClient();

  const currentPage = Number(page) || 1;
  const limit = 9;

  const { data } = await supabase
    .from('colores')
    .select('*')
    .range((currentPage - 1) * limit, currentPage * limit - 1)
    .order('id', { ascending: false });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header Colores */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Gestión de Colores</h1>
          <p className="text-[15px] text-slate-500 font-medium">Administra la paleta de colores para tus productos de forma centralizada.</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2.5 px-6 py-3.5 text-white bg-blue-600 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 font-bold text-sm active:scale-95 group">
            <IoAddOutline size={22} className="group-hover:rotate-90 transition-transform duration-300" />
            <span>Nuevo Color</span>
          </button>
        </div>
      </header>

      <ColoresContainer coloresIniciales={data || []} />
    </div>
  );
};

export default ColoresPage;
