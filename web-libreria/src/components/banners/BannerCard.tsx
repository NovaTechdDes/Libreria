'use client';
import { mensaje } from '@/src/helper';
import { useMutateBanner } from '@/src/hooks/banner/useMutateBanner';
import { Banner } from '@/src/interface/Banner';
import { useBannerStore } from '@/src/store/banner.store';
import Image from 'next/image';
import React from 'react';
import { BiPause, BiPlay } from 'react-icons/bi';
import { FiEdit2, FiTrash2, FiMoreVertical } from 'react-icons/fi';

interface BannerCardProps {
  banner: Banner;
}

export const BannerCard = ({ banner }: BannerCardProps) => {
  const { setBanner } = useBannerStore();
  const { startPutStatus, startDeleteBanner } = useMutateBanner();

  const handleEdit = () => {
    setBanner(banner);
  };

  const handleDelete = async () => {
    if (!banner.id) return;

    const res = await startDeleteBanner.mutateAsync(banner.id);

    if (res) {
      mensaje('Banner eliminado exitosamente', 'success');
    } else {
      mensaje('Error al eliminar el banner', 'error');
    }
  };

  const handleStatus = async () => {
    if (!banner.id) return;

    const res = await startPutStatus.mutateAsync({ id: banner.id, activo: !banner.activo });

    if (res) {
      mensaje('Banner actualizado exitosamente', 'success');
    } else {
      mensaje('Error al actualizar el banner', 'error');
    }
  };

  const statusColors = {
    ACTIVO: 'bg-emerald-100 text-emerald-600',
    PAUSADO: 'bg-amber-100 text-amber-600',
    PROGRAMADO: 'bg-blue-100 text-blue-600',
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-400 overflow-hidden hover:shadow-md transition-shadow group h-full w-xl">
      {/* Image Section */}
      <div className="relative h-44 bg-slate-100">
        {banner.imagen_url ? (
          <Image src={banner.imagen_url} alt={banner.titulo} width={1500} height={1080} className="w-full h-full object-cover" />
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
              <span>Subtitulo: </span>
              <span>{banner.subtitulo}</span>
            </div>
          </div>
          <button className="text-slate-300 hover:text-slate-600 p-1">
            <FiMoreVertical />
          </button>
        </div>

        <div className="flex justify-end items-center pt-2">
          <div className="flex gap-2 ">
            <button title="Pausar" onClick={handleStatus} className="p-2.5  rounded-xl border border-slate-400 text-slate-400 hover:text-yellow-600 hover:bg-yellow-50 transition-all">
              {banner.activo ? <BiPause size={24} /> : <BiPlay size={24} />}
            </button>
            <button title="Editar" onClick={handleEdit} className="p-2.5 rounded-xl border border-slate-400 text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition-all">
              <FiEdit2 size={24} />
            </button>
            <button onClick={handleDelete} title="Eliminar" className="p-2.5 rounded-xl border border-slate-400 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all">
              <FiTrash2 size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
