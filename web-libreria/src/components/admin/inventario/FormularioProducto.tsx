'use client';

import { useProductoStore } from '@/src/store/producto.store';
import { FiPlus, FiUploadCloud, FiCamera, FiImage } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { ModalColores } from './ModalColores';
import { ColorFormularioItem } from './ColorFormularioItem';
import { postrelacionColorProducto } from '@/src/helper/relacionColorProducto';

export const FormularioProducto = () => {
  const { productoSeleccionado, coloresSeleccionados, removeColor, addColores } = useProductoStore();
  const [showColores, setShowColores] = useState(false);

  const handleModal = () => setShowColores(!showColores);

  useEffect(() => {
    if (!productoSeleccionado?.id || !productoSeleccionado?.colores) return;

    addColores([...productoSeleccionado.colores]);
  }, [productoSeleccionado, addColores]);

  if (!productoSeleccionado) return null;

  const handleUpdate = () => {
    if (!productoSeleccionado.id) return;
    postrelacionColorProducto(productoSeleccionado.id, coloresSeleccionados);
  };

  return (
    <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-8 w-full lg:sticky lg:top-8 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-[#0096B1] p-2.5 rounded-xl text-white shadow-lg shadow-teal-100">
          <FiPlus className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 leading-tight">
          Modificar <br /> Producto
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-[14px] font-bold text-slate-400 uppercase tracking-wide mb-2" htmlFor="nombre">
            Descripción
          </label>
          <p className="text-black font-bold text-2xl">{productoSeleccionado.descripcion}</p>
        </div>

        {/* Imágenes */}
        <div>
          <label className="block text-[14px] font-bold text-slate-700 mb-3">Imágenes</label>
          <div className="flex gap-3">
            {/* Principal */}
            <div className="w-[85px] h-[85px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center bg-slate-50 group cursor-pointer hover:border-teal-500/50 hover:bg-teal-50/30 transition-all">
              <FiCamera className="w-6 h-6 text-slate-400 group-hover:text-teal-500 mb-1" />
              <span className="text-[10px] font-black text-slate-400 group-hover:text-teal-500 uppercase tracking-tighter">Principal</span>
            </div>
            {/* Secondary 1 */}
            <div className="w-[85px] h-[85px] border border-slate-100 rounded-2xl flex items-center justify-center bg-white cursor-pointer hover:border-teal-500/50 transition-all">
              <FiImage className="w-6 h-6 text-slate-200" />
            </div>
            {/* Secondary 2 */}
            <div className="w-[85px] h-[85px] border border-slate-100 rounded-2xl flex items-center justify-center bg-white cursor-pointer hover:border-teal-500/50 transition-all">
              <FiImage className="w-6 h-6 text-slate-200" />
            </div>
          </div>
        </div>

        {/* Colores */}
        <div>
          <label className="block text-[14px] font-bold text-slate-700 mb-3">Colores Disponibles</label>
          <div className="flex flex-wrap items-center gap-3">
            {coloresSeleccionados.map((color, i) => (
              <ColorFormularioItem removeColor={removeColor} key={i} color={color} />
            ))}
            <button
              onClick={handleModal}
              className="w-10 h-10 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 hover:border-teal-500 hover:text-teal-500 transition-all"
            >
              <FiPlus className="w-5 h-5" />
            </button>
          </div>
          <p className="text-[10px] font-black text-slate-400 mt-3 tracking-widest uppercase">Click para agregar nuevo tono</p>
        </div>

        {/* Submit */}
        <button
          onClick={handleUpdate}
          className="w-full bg-[#0096B1] text-white rounded-[20px] py-4.5 px-6 font-bold flex items-center justify-center gap-3 shadow-lg shadow-teal-100 hover:bg-[#008199] transition-all mt-4 group"
        >
          <FiUploadCloud className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
          <span className="text-[17px]">Actualizar Producto</span>
        </button>
      </div>

      {showColores && <ModalColores isOpen={showColores} onClose={handleModal} />}
    </div>
  );
};
