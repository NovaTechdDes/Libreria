"use client";

import React from 'react'
import { IoGrid, IoList, IoChevronBack, IoChevronForward } from 'react-icons/io5'
import { ColorItem } from './ColorItem';
import { Color } from '@/src/interface/Color';

const coloresHardcoded: Color[] = [
  {
    id: "1",
    color: 'Cian Corporativo',
    codigo: '#006A6A',
    
  },
  {
    id: "2",
    color: 'Rosa Pastel',
    codigo: '#FFB4AB',
  },
  {
    id: "3",
    color: 'Azul Medianoche',
    codigo: '#455F87',
  },
  {
    id: "4",
    color: 'Amarillo Sol',
    codigo: '#FFD700',
  },
  {
    id: "5",
    color: 'Gris Técnico',
    codigo: '#E0E3E5',
    
  },
]

export const ListaColores = () => {

    
  return (
    <div className="mt-12 bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
      
      {/* Header de la Lista */}
      <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
        <h2 className="text-slate-500 font-semibold text-sm">24 Colores registrados</h2>
        <div className="flex gap-2">
          <button className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 shadow-sm">
            <IoGrid size={18} />
          </button>
          <button className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-600 transition-colors">
            <IoList size={18} />
          </button>
        </div>
      </div>

      {/* Grid de Colores */}
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {coloresHardcoded.map((color) => (
          <ColorItem key={color.id} color={color} />
        ))}

      </div>

      {/* Paginación */}
      <div className="p-6 border-t border-slate-50 flex items-center justify-between">
        <button className="flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-slate-800 transition-colors">
          <IoChevronBack size={18} />
          Anterior
        </button>

        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-xl bg-teal-700 text-white font-bold flex items-center justify-center shadow-md shadow-teal-700/20">1</button>
          <button className="w-10 h-10 rounded-xl text-slate-500 font-bold flex items-center justify-center hover:bg-slate-100">2</button>
          <button className="w-10 h-10 rounded-xl text-slate-500 font-bold flex items-center justify-center hover:bg-slate-100">3</button>
        </div>

        <button className="flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-slate-800 transition-colors">
          Siguiente
          <IoChevronForward size={18} />
        </button>
      </div>

    </div>
  )
}
