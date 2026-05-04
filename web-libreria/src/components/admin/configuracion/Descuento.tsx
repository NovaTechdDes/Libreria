'use client';
import { useState } from 'react';
import { FiPercent, FiType, FiSave, FiTag } from 'react-icons/fi';

export const Descuento = () => {
  const [frase, setFrase] = useState<string>('');
  const [porcentaje, setPorcentaje] = useState<number>(0);

  return (
    <section className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header del Componente */}
      <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600">
            <FiTag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Configuración de Descuentos</h3>
            <p className="text-sm text-slate-500">Gestiona las ofertas </p>
          </div>
        </div>
      </div>

      <form className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Campo: Frase */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
              <FiType className="w-4 h-4 text-slate-400" />
              Frase del descuento
            </label>
            <div className="relative group">
              <input
                type="text"
                placeholder="Ej: ¡Oferta de Verano!"
                className="w-full h-12 bg-slate-50 border border-slate-400 rounded-2xl px-5 text-slate-600 outline-none transition-all focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                value={frase}
                onChange={(e) => setFrase(e.target.value)}
              />
            </div>
          </div>

          {/* Campo: Porcentaje */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
              <FiPercent className="w-4 h-4 text-slate-400" />
              Porcentaje de descuento
            </label>
            <div className="relative flex items-center">
              <input
                type="number"
                min="0"
                max="100"
                placeholder="0"
                className="w-full h-12 bg-slate-50 border border-slate-400 rounded-2xl px-5 pr-12 text-slate-600 outline-none transition-all focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 font-medium"
                value={porcentaje}
                onChange={(e) => setPorcentaje(Number(e.target.value))}
              />
              <span className="absolute right-5 text-slate-400 font-bold">%</span>
            </div>
          </div>
        </div>

        {/* Preview Simple (Opcional, da un toque pro) */}
        {(frase || porcentaje > 0) && (
          <div className="bg-teal-50/50 border border-teal-100 rounded-2xl p-4 flex items-center justify-between animate-in zoom-in-95 duration-300">
            <span className="text-xs font-black text-teal-600 uppercase tracking-widest">Vista Previa</span>
            <div className="flex items-center gap-2">
              <span className="text-teal-700 font-bold">{frase}</span>
              <span className="bg-teal-500 text-white px-2 py-0.5 rounded-lg text-sm font-black">-{porcentaje}%</span>
            </div>
          </div>
        )}

        {/* Botón Guardar */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full md:w-auto px-2 min-w-[200px] bg-teal-500 hover:bg-teal-600 text-white h-12 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition-all active:scale-[0.98] group"
          >
            <FiSave className="w-5 h-5 group-hover:rotate-6 transition-transform" />
            Guardar Configuración
          </button>
        </div>
      </form>
    </section>
  );
};
