'use client';

import { Rubro } from '@/src/interface/Rubro';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';

interface Props {
  rubro: Rubro;
  activo: boolean;
}

export const RubroItem = ({ rubro, activo }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subrubroActivo = Number(searchParams.get('subrubro'));
  const tieneSubrubros = (rubro.subrubros?.length ?? 0) > 0;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [abierto, setAbierto] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const abrir = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setCoords({ top: rect.bottom + 8, left: rect.left });
    }
    setAbierto(true);
  };

  const cerrarConDelay = () => {
    timeoutRef.current = setTimeout(() => setAbierto(false), 180);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative shrink-0 snap-start"
      onMouseEnter={tieneSubrubros ? abrir : undefined}
      onMouseLeave={tieneSubrubros ? cerrarConDelay : undefined}
    >
      {/* Pill principal */}
      <button
        onClick={() => router.push(rubro.id === 0 ? '/' : `/?rubro=${rubro.id}`)}
        className={[
          'flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2 rounded-full text-xs font-semibold',
          'transition-all duration-200 ease-in-out outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
          activo
            ? 'bg-secondary text-white shadow-[0_2px_8px_rgba(30,58,95,0.30)] scale-[1.04]'
            : 'bg-white text-secondary border border-gray-200 shadow-sm hover:border-primary/60 hover:text-primary hover:shadow-[0_2px_8px_rgba(85,180,138,0.15)] hover:scale-[1.02]',
          'active:scale-95',
        ].join(' ')}
      >
        {rubro.nombre}
        {tieneSubrubros && (
          <svg
            className={`w-2.5 h-2.5 opacity-60 transition-transform duration-200 ${abierto ? 'rotate-180 opacity-100' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      {/* Dropdown — posición fixed calculada desde el wrapper */}
      {tieneSubrubros && (
        <div
          aria-hidden={!abierto}
          onMouseEnter={abrir}
          onMouseLeave={cerrarConDelay}
          style={{ top: coords.top, left: coords.left }}
          className={[
            'fixed z-200 w-max min-w-[160px] max-w-[220px] max-h-[260px]',
            'bg-white/95 backdrop-blur-sm rounded-2xl',
            'border border-gray-100',
            'shadow-[0_8px_24px_rgba(30,58,95,0.12),0_2px_6px_rgba(0,0,0,0.06)]',
            'transition-[opacity,transform] duration-200 ease-out origin-top-left',
            'flex flex-col overflow-hidden',
            abierto
              ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 scale-95 -translate-y-1 pointer-events-none',
          ].join(' ')}
        >
          {/* "Todos" — fijo arriba */}
          <button
            onClick={() => router.push(rubro.id === 0 ? '/' : `/?rubro=${rubro.id}`)}
            className={[
              'relative shrink-0 w-full text-left px-4 py-2.5 text-xs font-medium transition-colors duration-150',
              activo && !subrubroActivo
                ? 'text-primary bg-primary/8'
                : 'text-secondary hover:text-primary hover:bg-primary/5',
            ].join(' ')}
          >
            {activo && !subrubroActivo && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-3.5 w-[3px] rounded-r-full bg-primary" />
            )}
            Todos
          </button>

          <div className="mx-3 shrink-0 h-px bg-gray-100" />

          {/* Lista con scroll interno */}
          <div className="overflow-y-auto overscroll-contain scrollbar-hide flex-1">
            {rubro.subrubros!.map((sub) => {
              const isActive = subrubroActivo === sub.id_subrubro && activo;
              return (
                <button
                  key={sub.id_subrubro}
                  onClick={() => router.push(`/?rubro=${rubro.id}&subrubro=${sub.id_subrubro}`)}
                  className={[
                    'relative w-full text-left px-4 py-2.5 text-xs font-medium transition-colors duration-150',
                    isActive
                      ? 'text-primary bg-primary/8'
                      : 'text-secondary hover:text-primary hover:bg-primary/5',
                  ].join(' ')}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-3.5 w-[3px] rounded-r-full bg-primary" />
                  )}
                  {sub.nombre}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
