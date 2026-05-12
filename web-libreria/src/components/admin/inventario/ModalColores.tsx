'use client';

import { useEffect, useState } from 'react';
import { FiX, FiPlus, FiLoader } from 'react-icons/fi';
import type { Color } from '@/src/interface/Color';

import { ModalColoreItem } from './ModalColoreItem';
import { useProductoStore } from '@/src/store/producto.store';
import { createClient } from '@/src/lib/client';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalColores = ({ isOpen, onClose }: Props) => {
  const supabase = createClient();
  const { addColores, coloresSeleccionados } = useProductoStore();

  const [coloresDB, setColoresDB] = useState<Color[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set(coloresSeleccionados.map((c) => c.id).filter((id): id is number => id !== undefined)));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const fetchColores = async () => {
        setLoading(true);
        const { data } = await supabase.from('colores').select('*');
        if (data) {
          setColoresDB(data);
        }
        setLoading(false);
      };
      fetchColores();
    }
  }, [isOpen]);

  const toggleColor = (id: number) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleAgregar = () => {
    const selectedColores = coloresDB.filter((c) => c.id && selectedIds.has(c.id));
    addColores([...selectedColores]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-[#0096B1] p-2.5 rounded-2xl text-white shadow-lg shadow-teal-100">
              <FiPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 leading-none">Seleccionar Colores</h2>
              <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mt-1">Biblioteca de Tonos</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-colors">
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 pb-8">
          <div className="bg-slate-50 rounded-[24px] p-6 min-h-[300px] max-h-[400px] overflow-y-auto custom-scrollbar border border-slate-400">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-3">
                <FiLoader className="w-8 h-8 animate-spin text-[#0096B1]" />
                <span className="font-bold text-[14px] uppercase tracking-widest">Cargando tonos...</span>
              </div>
            ) : coloresDB.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-3">
                <p className="font-bold text-[14px] uppercase tracking-widest">No hay colores disponibles</p>
              </div>
            ) : (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                {coloresDB.map((color) => {
                  const isSelected = !!(color.id && selectedIds.has(color.id));
                  return <ModalColoreItem key={color.id || color.codigo} color={color} isSelected={isSelected} toggleColor={toggleColor} />;
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[13px] font-bold text-slate-500">
            {selectedIds.size} {selectedIds.size === 1 ? 'color seleccionado' : 'colores seleccionados'}
          </span>
          <button
            onClick={handleAgregar}
            disabled={selectedIds.size === 0}
            className="bg-[#0096B1] disabled:bg-slate-300 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-teal-100 hover:shadow-teal-200 transition-all active:scale-95 flex items-center gap-2 group"
          >
            <span className="text-[15px]">Agregar a la lista</span>
            <FiPlus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
