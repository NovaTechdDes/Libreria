'use client';
import { updateDescuentoRubro } from '@/src/actions/rubro.actions';
import { mensaje } from '@/src/helper';
import { Rubro } from '@/src/interface/Rubro';
import { useState } from 'react';
import { FiPercent, FiSave, FiTag } from 'react-icons/fi';

interface Props {
  rubro: Rubro;
}

export const RubroItemTr = ({ rubro }: Props) => {
  const [descuento, setDescuento] = useState<number>(rubro.descuento ?? 0);
  const [isPending, setIsPending] = useState(false);

  const handleGuardar = async () => {
    setIsPending(true);
    const ok = await updateDescuentoRubro(rubro.id, descuento);
    setIsPending(false);

    if (ok) {
      mensaje('Descuento actualizado correctamente', 'success');
    } else {
      mensaje('Error al actualizar el descuento', 'error');
    }
  };

  return (
    <tr key={rubro.id} className="hover:bg-slate-50/80 transition-colors group">
      <td className="px-6 py-4 text-sm font-semibold text-slate-400">#{rubro.id}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 font-bold group-hover:bg-teal-500 group-hover:text-white transition-colors">
            <FiTag className="w-4 h-4" />
          </div>
          <span className="font-semibold text-slate-800 text-[15px]">{rubro.nombre}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="relative flex items-center max-w-37.5">
          <input
            type="number"
            min="0"
            max="100"
            value={descuento}
            onChange={(e) => setDescuento(Number(e.target.value))}
            className="w-full h-10 bg-slate-50 border border-slate-300 rounded-xl pl-3 pr-8 text-sm text-slate-700 font-medium outline-none focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
            placeholder="0"
          />
          <span className="absolute right-3 text-slate-400 text-xs font-bold pointer-events-none">
            <FiPercent className="w-3.5 h-3.5" />
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-right">
        <button
          onClick={() => handleGuardar()}
          disabled={isPending}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold rounded-xl shadow-sm shadow-teal-500/20 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiSave className="w-4 h-4" />
          {isPending ? 'Guardando...' : 'Guardar'}
        </button>
      </td>
    </tr>
  );
};
