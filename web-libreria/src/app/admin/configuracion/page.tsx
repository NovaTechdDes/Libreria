import { Descuento, Informativo } from '@/src/components';
import { getConfiguracion } from '@/src/helper/configuracion';
import { FiSettings, FiSliders } from 'react-icons/fi';

const page = async () => {
  const dataConfiguracion = await getConfiguracion();

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Cabecera de la Página */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-teal-600 font-bold text-sm uppercase tracking-widest">
              <FiSliders className="w-4 h-4" />
              <span>Panel de Control</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Configuración <span className="text-slate-400">General</span>
            </h1>
            <p className="text-slate-500 text-lg">Ajusta los parámetros globales de la tienda y avisos a clientes.</p>
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-sm bg-slate-100 px-4 py-2 rounded-2xl border border-slate-200">
            <FiSettings className="w-4 h-4" />
            <span>ID de Sesión: Admin-Lachi</span>
          </div>
        </header>

        {/* Sección de Contenido */}
        <div className="grid grid-cols-1 gap-8 pb-20">
          <Descuento dataConfiguracion={dataConfiguracion} />
          <Informativo dataConfiguracion={dataConfiguracion} />
        </div>
      </div>
    </main>
  );
};

export default page;
