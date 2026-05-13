'use client';
import { Banner } from '@/src/interface/Banner';
import Image from 'next/image';
import React from 'react';
import { FiEdit2, FiTrash2, FiMoreVertical, FiMapPin } from 'react-icons/fi';

interface BannerCardProps {
  banner: Banner;
}

export const BannerCard = ({ banner }: BannerCardProps) => {
  const statusColors = {
    ACTIVO: 'bg-emerald-100 text-emerald-600',
    PAUSADO: 'bg-amber-100 text-amber-600',
    PROGRAMADO: 'bg-blue-100 text-blue-600',
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group h-full">
      {/* Image Section */}
      <div className="relative h-44 bg-slate-100">
        {banner.imagen_url ? (
          <Image src={banner.imagen_url} alt={banner.titulo} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-teal-50 to-emerald-50" />
        )}
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${statusColors[banner.activo ? 'ACTIVO' : 'PAUSADO']}`}>
          {banner.activo ? 'ACTIVO' : 'PAUSADO'}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800 text-sm line-clamp-1">{banner.titulo}</h3>
            <div className="flex items-center gap-1.5 text-slate-400 text-xs">
              <FiMapPin size={12} />
              <span>{banner.subtitulo}</span>
            </div>
          </div>
          <button className="text-slate-300 hover:text-slate-600 p-1">
            <FiMoreVertical />
          </button>
        </div>

        <div className="flex justify-between items-center pt-2">
          {/* User Avatar Placeholder */}
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-white flex items-center justify-center text-[10px] font-bold text-slate-400">{banner.titulo?.charAt(0) || 'B'}</div>

          <div className="flex gap-2">
            <button className="p-2.5 rounded-xl border border-slate-100 text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition-all">
              <FiEdit2 size={16} />
            </button>
            <button className="p-2.5 rounded-xl border border-slate-100 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all">
              <FiTrash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
