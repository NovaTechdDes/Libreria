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
        <div className="w-full bg-slate-900 text-white py-3 px-6 rounded-2xl flex items-center justify-center text-center text-sm font-medium animate-pulse">
          <span>{configuracion.mensaje_informativo}</span>
        </div>
      )}
      <Header habilitado={configuracion.carrito_habilitado} />
      <main className="flex flex-1 ">{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
