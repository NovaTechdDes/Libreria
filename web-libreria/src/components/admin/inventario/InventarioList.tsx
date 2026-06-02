import { Producto } from '@/src/interface/Producto';
import { InventarioItem } from './InventarioItem';
import Link from 'next/link';

interface Props {
  productos: Producto[];
  totalPages: number;
  currentPage: number;
  totalProductos: number;
  limit: number;
}

export const InventarioList = ({ limit, productos, totalPages, currentPage, totalProductos }: Props) => {
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

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-6">
      <div className="overflow-x-auto overflow-y-scroll max-h-[600px]">
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
              href={`/admin/inventario?page=${currentPage - 1}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-[14px] hover:bg-slate-50 transition-all"
            >
              Anterior
            </Link>
          ) : (
            <div></div>
          )}
          {currentPage < totalPages ? (
            <Link
              href={`/admin/inventario?page=${currentPage + 1}`}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0096B1] text-white font-bold text-[14px] hover:bg-[#008199] transition-all shadow-sm shadow-teal-100"
            >
              Siguiente
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="px-6 py-4 pb-5 overflow-auto flex justify-center items-center gap-1 border-t border-slate-50 bg-slate-50/30">
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
                className={`px-3 py-1 rounded-lg border text-sm font-medium transition-all ${
                  currentPage === pagina
                    ? 'border-[#0096B1] bg-[#0096B1] text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
                href={`/admin/inventario?page=${pagina}`}
              >
                {pagina}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
