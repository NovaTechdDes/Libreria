'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Banner } from '@/src/interface/Banner';

interface Props {
  banners: Banner[];
}

export const BannerCarousel = ({ banners }: Props) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  }, [banners.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  if (!banners.length) return null;

  return (
    <div
      className="relative w-full h-[200px] md:h-[350px] overflow-hidden shadow-xl group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
            index === current ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'
          }`}
        >
          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent z-10" />
          <Image
            src={banner.imagen_url || ''}
            alt={banner.titulo || 'Banner'}
            fill
            className="object-cover"
            priority={index === 0}
          />

          {/* Contenido del Banner */}
          <div className="absolute bottom-6 left-6 md:left-12 z-20 text-white max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black mb-1 drop-shadow-lg leading-tight animate-in fade-in slide-in-from-left-10 duration-700">
              {banner.titulo}
            </h2>
            <p className="text-sm md:text-lg text-white/90 font-medium drop-shadow-md animate-in fade-in slide-in-from-left-10 duration-1000">
              {banner.subtitulo}
            </p>
          </div>
        </div>
      ))}

      {/* Botones de Navegación */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40 active:scale-90"
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40 active:scale-90"
      >
        <FiChevronRight size={24} />
      </button>

      {/* Indicadores (Dots) */}
      <div className="absolute bottom-6 right-10 z-30 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              current === index ? 'w-8 bg-teal-400' : 'w-2 bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
