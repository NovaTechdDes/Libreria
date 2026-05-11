import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { ColorItem } from './ColorItem';
import { Color } from '@/src/interface/Color';
import Link from 'next/link';
import { HeaderColores } from './HeaderColores';

interface Props {
  colores: Color[];
  totalPages: number;
  currentPage: number;
}

export const ListaColores = ({ colores, totalPages, currentPage }: Props) => {
  return (
    <div className="mt-12 bg-white flex-1 rounded-4xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
      {/* Header de la Lista */}
      <HeaderColores colores={colores} />

      {/* Grid de Colores */}
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {colores?.map((color) => (
          <ColorItem key={color.id} color={color} />
        ))}
      </div>

      {/* Paginación */}
      <div className="p-6 border-t border-slate-50 flex items-center justify-between">
        {currentPage > 1 ? (
          <Link href={`/admin/colores?page=${currentPage - 1}`} className="flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-slate-800 transition-colors">
            <IoChevronBack size={18} />
            Anterior
          </Link>
        ) : (
          <div></div>
        )}

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <Link
              href={`/admin/colores?page=${index + 1}`}
              key={index}
              className={`w-10 h-10 rounded-xl font-bold flex items-center justify-center ${currentPage === index + 1 ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              {index + 1}
            </Link>
          ))}
        </div>

        {currentPage < totalPages ? (
          <Link href={`/admin/colores?page=${currentPage + 1}`} className="flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-slate-800 transition-colors">
            Siguiente
            <IoChevronForward size={18} />
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
