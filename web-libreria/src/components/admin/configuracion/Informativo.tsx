'use client';
import { putBannerConfig } from '@/src/helper/configuracion';
import { Configuracion } from '@/src/interface/Configuracion';
import { useState } from 'react';
import { FiInfo, FiEye, FiSave, FiAlertCircle, FiEyeOff } from 'react-icons/fi';
import { mensaje as mensajeSwal } from '@/src/helper/mensaje';

interface Props {
  dataConfiguracion: Configuracion;
}

export const Informativo = ({ dataConfiguracion }: Props) => {
  const [mensaje, setMensaje] = useState<string>(dataConfiguracion.mensaje_informativo);

  const [activo, setActivo] = useState<boolean>(dataConfiguracion.carrito_habilitado);

  const handleConfiguracionData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await putBannerConfig({ mensaje, habilitado: activo });

    if (res) {
      mensajeSwal('Banner actualizado', 'success');
    } else {
      mensajeSwal('Error al actualizar el banner', 'error');
    }
  };

  return (
    <section className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150 mt-8">
      {/* Header */}
      <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
            <FiInfo className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Banner Informativo</h3>
            <p className="text-sm text-slate-500">Configura avisos importantes para tus clientes</p>
          </div>
        </div>

        {/* Toggle de Activación */}
        <button
          type="button"
          onClick={() => setActivo(!activo)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${activo ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20' : 'bg-slate-100 text-slate-500'}`}
        >
          {activo ? (
            <>
              <FiEye className="w-4 h-4" />
              Carrito habilitado
            </>
          ) : (
            <>
              <FiEyeOff className="w-4 h-4" />
              Carrito deshabilitado
            </>
          )}
        </button>
      </div>

      <form className="p-8 space-y-6" onSubmit={handleConfiguracionData}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mensaje del Banner */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
              <FiAlertCircle className="w-4 h-4 text-slate-400" />
              Mensaje del anuncio
            </label>
            <textarea
              placeholder="Ej: El dia Miercoles 24/05 no haremos envios..."
              rows={2}
              className="w-full bg-slate-50 border border-slate-400 rounded-2xl p-5 text-slate-600 outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 resize-none"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />
          </div>
        </div>

        {/* Preview del Banner */}
        {mensaje && (
          <div className="pt-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3 ml-1">Vista Previa en Web</span>
            <div className="w-full bg-slate-900 text-white py-3 px-6 rounded-2xl flex items-center justify-center text-center text-sm font-medium animate-pulse">
              <span>{mensaje}</span>
            </div>
          </div>
        )}

        {/* Guardar */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full md:w-auto min-w-[200px] bg-slate-800 hover:bg-slate-900 text-white h-12 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] group"
          >
            <FiSave className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" />
            Actualizar Aviso
          </button>
        </div>
      </form>
    </section>
  );
};
