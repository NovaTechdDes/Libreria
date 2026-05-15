import { Footer, Header } from '@/src/components';
import { createClient } from '@/src/lib/server';
import React from 'react';

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = await createClient();

  const { data: configuracion, error } = await supabase.from('configuracion').select('*').single();

  if (error) {
    console.error('Error al obtener la configuración:', error);
    return null;
  }

  return (
    <div className="flex flex-col h-screen">
      {configuracion.mensaje_informativo && (
        <div className="w-full bg-linear-to-r from-secondary via-primary to-secondary py-2 px-4 md:px-6 flex items-center justify-center text-center text-[11px] sm:text-xs md:text-sm font-semibold text-white shadow-lg overflow-hidden relative group">
          {/* Shimmer Effect */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="h-full w-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
          </div>
          
          <span className="relative z-10 flex items-center gap-2 md:gap-3 tracking-wide max-w-[95%]">
            <span className="shrink-0 flex relative h-1.5 w-1.5 md:h-2 md:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-white"></span>
            </span>
            
            <span className="leading-tight line-clamp-2 md:line-clamp-none md:whitespace-normal text-balance">
              {configuracion.mensaje_informativo}
            </span>

            <span className="shrink-0 flex relative h-1.5 w-1.5 md:h-2 md:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-white"></span>
            </span>
          </span>
        </div>
      )}
      <Header habilitado={configuracion.carrito_habilitado} />
      <main className="flex flex-1 ">{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
