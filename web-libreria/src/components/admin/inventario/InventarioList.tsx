import { Producto } from '@/src/interface/Producto';
import { InventarioItem } from './InventarioItem';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  productos: Producto[];
  totalPages: number;
  currentPage: number;
  totalProductos: number;
  limit: number;
<<<<<<< HEAD
  rubro: number | undefined;
  subrubro: number | undefined;
  search: string | undefined;
=======

  rubro?: number;
  subrubro?: number;
  search?: string;
>>>>>>> dev
}

export const InventarioList = ({ limit, productos, totalPages, currentPage, totalProductos, rubro, subrubro, search }: Props) => {
  const router = useRouter();
  const [numeroProducto, setNumeroProducto] = useState<number>(1);

  let string = '';
  if(rubro) string += `&rubro=${rubro}`;
  if(subrubro) string += `&subrubro=${subrubro}`;
  if(search) string += `&search=${search}`;

  let string = '';
  if(rubro) string += `&rubro=${rubro}`;
  if(subrubro) string += `&subrubro=${subrubro}`;
  if(search) string += `&search=${search}`;

  const getPaginasVisibles = () => {
    const paginas: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        paginas.push(i);
      }
    } else {
      paginas.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }

      if (start > 2) {
        paginas.push('...');
      }

      for (let i = start; i <= end; i++) {
        paginas.push(i);
      }

      if (end < totalPages - 1) {
        paginas.push('...');
      }

      paginas.push(totalPages);
    }
    return paginas;
  };

  const handlePage = () => {
    const page = Math.ceil(numeroProducto / limit);
    router.push(`/admin/inventario?page=${page}` + string)
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-1">
      <div className="overflow-x-auto overflow-y-scroll max-h-[50vh]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider">Producto</th>
              <th className="px-6 py-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider">Precio</th>
              <th className="px-6 py-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider">Visibilidad</th>
              <th className="px-6 py-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {productos.map((producto) => (
              <InventarioItem key={producto.id_producto} producto={producto} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="px-6 py-5 border-t border-slate-100 flex items-center justify-between bg-white">
        {productos.length > 0 && (
          <p className="text-xs md:text-[14px] font-medium text-slate-500 gap-2 flex  ">
            Mostrando 
            <span className="text-slate-900">{productos.length}</span> 
            de 
            <span className="text-slate-900">{totalProductos}</span> 
            productos desde
            <span className='text-slate-900'>{currentPage * limit - limit + 1}</span>
            hasta
            <span className='text-slate-900'>{(currentPage * limit - limit) + productos.length}</span>
          </p>
        )}

        <div className="flex gap-3">
          {currentPage > 1 ? (
            <Link
              href={`/admin/inventario?page=${currentPage - 1}` + string}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-[14px] hover:bg-slate-50 transition-all"
            >
              Anterior
            </Link>
          ) : (
            <div></div>
          )}
          {currentPage < totalPages ? (
            <Link
              href={`/admin/inventario?page=${currentPage + 1}` + string}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0096B1] text-white font-bold text-[14px] hover:bg-[#008199] transition-all shadow-sm shadow-teal-100"
            >
              Siguiente
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      </div>


      <div className='w-full flex flex-col sm:flex-row gap-4 items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/20'>
        <div className='flex gap-3 items-center text-sm text-slate-500 font-medium'>
          <span>Ir al producto N°</span>
          <input 
            type="number" 
            value={numeroProducto}
            onChange={(e) => setNumeroProducto(Number(e.target.value))}
            min={1} 
            max={totalProductos} 
            className='border border-slate-500 focus:border-[#0096B1] focus:ring-2 focus:ring-[#0096B1]/20 rounded-xl w-20 py-1.5 text-center text-slate-800 font-bold outline-none transition-all bg-white text-sm' 
          />
          <button onClick={handlePage} className='px-4 py-2 rounded-xl bg-[#0096B1] text-white font-bold text-[13px] hover:bg-[#008199] active:scale-95 transition-all shadow-sm hover:shadow-md cursor-pointer'>
            Ir
          </button>
        </div>

        {totalPages > 1 && (
          <div className="overflow-auto flex justify-center items-center gap-1.5 py-1">
            {getPaginasVisibles().map((pagina, idx) => {
              if (pagina === '...') {
                return (
                  <span key={`dots-${idx}`} className="px-2 py-1 text-slate-400 select-none">
                    ...
                  </span>
                );
              }
              return (
                <Link
                  key={pagina}
                  className={`px-3 py-1.5 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                    currentPage === pagina
                      ? 'border-[#0096B1] bg-[#0096B1] text-white shadow-sm'
                      : 'border-slate-500 bg-white text-slate-600 hover:bg-slate-300 hover:border-slate-300'
                  }`}
                  href={`/admin/inventario?page=${pagina}` + string}
                >
                  {pagina}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
