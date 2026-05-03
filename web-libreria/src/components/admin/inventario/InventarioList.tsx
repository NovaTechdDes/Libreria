import { Producto } from "@/src/interface/Producto";
import React from "react";
import { InventarioItem } from "./InventarioItem";


interface Props {
  productos: Producto[];
}


export const InventarioList = ({ productos }: Props) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider">
                Producto
              </th>
              <th className="px-6 py-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider">
                Visibilidad
              </th>
              <th className="px-6 py-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {productos.map((producto) => (
              <InventarioItem key={producto.id} producto={producto} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="px-6 py-5 border-t border-slate-100 flex items-center justify-between bg-white">
        <p className="text-[14px] font-medium text-slate-500">
          Mostrando <span className="text-slate-900">{productos.length}</span> de{" "}
          <span className="text-slate-900">1,284</span> productos
        </p>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-[14px] hover:bg-slate-50 transition-all">
            Anterior
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0096B1] text-white font-bold text-[14px] hover:bg-[#008199] transition-all shadow-sm shadow-teal-100">
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};
