'use client';
import React from 'react';
import Image from 'next/image';

interface BannerSlideProps {
  titulo: string;
  subtitulo: string;
  imagen_url: string;
  className?: string;
}

export const BannerSlide = ({ titulo, subtitulo, imagen_url, className = '' }: BannerSlideProps) => {
  return (
    <div className={`relative w-full aspect-21/9 md:aspect-24/10 overflow-hidden rounded-3xl ${className}`} style={{ containerType: 'inline-size' }}>
      {/* Background Image */}
      {imagen_url ? <Image src={imagen_url} alt={titulo} fill className="object-cover" priority /> : <div className="absolute inset-0 bg-linear-to-br from-slate-100 to-slate-200" />}

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-[8cqw] md:px-[10cqw]">
        <div className="max-w-[70cqw] space-y-[2cqw]">
          <h2 className="font-black text-white leading-[1.1] drop-shadow-2xl" style={{ fontSize: 'clamp(1.5rem, 6cqw, 4rem)' }}>
            {titulo || 'Tu Título Aquí'}
          </h2>
          <p className="text-white/90 font-medium drop-shadow-md line-clamp-2" style={{ fontSize: 'clamp(0.875rem, 2.5cqw, 1.25rem)' }}>
            {subtitulo || 'Tu descripción o subtítulo aparecerá aquí para complementar la oferta.'}
          </p>
        </div>
      </div>
    </div>
  );
};
