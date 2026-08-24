'use client';

import React, { useState } from 'react';
import { Rubro } from '@/src/interface/Rubro';
import { FiSearch } from 'react-icons/fi';
import { ordenarRubros } from '@/src/helper/ordernarRubros';
import { RubroItemTr } from './RubroItemTr';

interface Props {
  rubros: Rubro[];
}

export const RubrosContainer = ({ rubros }: Props) => {
  const [busqueda, setBusqueda] = useState<string>('');

  const rubrosFiltrados = ordenarRubros(rubros.filter((rubro) => rubro.nombre.toLowerCase().includes(busqueda.toLowerCase()) && rubro.id !== 0 && String(rubro.id) !== ''));

  return (
    <div className="mt-6 space-y-4">
      {/* Barra de Búsqueda y Estadísticas */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar rubro..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-700 outline-none focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
          />
        </div>
        <div className="text-sm font-medium text-slate-500 self-end sm:self-center">
          Total rubros: <span className="font-bold text-slate-800">{rubrosFiltrados.length}</span>
        </div>
      </div>

      {/* Tabla de Rubros */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[13px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Rubro</th>
                <th className="px-6 py-4">Descuento (%)</th>
                <th className="px-6 py-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rubrosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-slate-400 font-medium">
                    No se encontraron rubros
                  </td>
                </tr>
              ) : (
                rubrosFiltrados.map((rubro) => {
                  return <RubroItemTr rubro={rubro} key={rubro.id} />;
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
