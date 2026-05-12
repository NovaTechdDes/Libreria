import { Producto } from '@/src/interface/Producto';
import { InventarioItem } from './InventarioItem';
import Link from 'next/link';

interface Props {
  productos: Producto[];
  totalPages: number;
  currentPage: number;
  totalProductos: number;
}

export const InventarioList = ({ productos, totalPages, currentPage, totalProductos }: Props) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-6">
      <div className="overflow-x-auto">
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
        <p className="text-[14px] font-medium text-slate-500">
          Mostrando <span className="text-slate-900">{productos.length}</span> de <span className="text-slate-900">{totalProductos}</span> productos
        </p>
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
    </div>
  );
};
