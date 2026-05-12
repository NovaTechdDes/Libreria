'use client';

import { useProductoStore } from '@/src/store/producto.store';
import { FiPlus, FiUploadCloud, FiCamera, FiImage } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { ModalColores } from './ModalColores';
import { ColorFormularioItem } from './ColorFormularioItem';

import { useRef } from 'react';
import Image from 'next/image';
import { useMutateProductos } from '@/src/hooks/productos/useMutateProductos';

export type ImageItem = {
  file: File | null;
  preview: string | null;
  url?: string;
};

export const FormularioProducto = () => {
  const { startUpdateProducto } = useMutateProductos();
  const { productoSeleccionado, coloresSeleccionados, removeColor, addColores } = useProductoStore();

  const [showColores, setShowColores] = useState(false);
  const [images, setImages] = useState<ImageItem[]>([
    { file: null, preview: null },
    { file: null, preview: null },
    { file: null, preview: null },
  ]);

  //Primer Imagen

  const inputRef = useRef<HTMLInputElement>(null);

  const inputRef2 = useRef<HTMLInputElement>(null);

  const inputRef3 = useRef<HTMLInputElement>(null);

  const handleModal = () => setShowColores(!showColores);

  useEffect(() => {
    if (!productoSeleccionado?.id_producto || !productoSeleccionado?.productos_colores) return;

    addColores([...productoSeleccionado?.productos_colores.map((c) => c.colores)]);
  }, [productoSeleccionado, addColores]);

  useEffect(() => {
    if (!productoSeleccionado?.id_producto || !productoSeleccionado?.productos_colores || !productoSeleccionado?.imagenes) return;

    const imagenesParseadas = JSON.parse(productoSeleccionado.imagenes);

    imagenesParseadas?.map((image: string, i: number) => {
      setImages((prev) => {
        const newImages = [...prev];
        newImages[i] = { file: null, preview: image };
        return newImages;
      });
    });
  }, [productoSeleccionado]);

  if (!productoSeleccionado) return null;

  const handleUpdate = () => {
    if (!productoSeleccionado.id_producto) return;

    startUpdateProducto.mutateAsync({ colores: coloresSeleccionados, imagenes: images, id: productoSeleccionado.id_producto });
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newImages = [...images];
    console.log(file);
    newImages[index] = {
      file,
      preview: URL.createObjectURL(file),
    };

    setImages(newImages);
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
            <div
              onClick={() => inputRef.current?.click()}
              className="w-[85px] h-[85px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center bg-slate-50 group cursor-pointer hover:border-teal-500/50 hover:bg-teal-50/30 transition-all"
            >
              {images[0].preview ? (
                <Image src={images[0].preview} alt="Principal" width={85} height={85} className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <>
                  <FiCamera className="w-6 h-6 text-slate-400 group-hover:text-teal-500 mb-1" />
                  <span className="text-[10px] font-black text-slate-400 group-hover:text-teal-500 uppercase tracking-tighter">Principal</span>
                  <input ref={inputRef} type="file" accept="image/*" name="imagenPrincipal" id="imagenPrincipal" hidden onChange={(e) => handleUpload(e, 0)} />
                </>
              )}
            </div>

            {/* Secondary 1 */}
            <div
              onClick={() => inputRef2.current?.click()}
              className="w-[85px] h-[85px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center bg-slate-50 group cursor-pointer hover:border-teal-500/50 hover:bg-teal-50/30 transition-all"
            >
              {images[1].preview ? (
                <Image src={images[1].preview} alt="Principal" width={85} height={85} className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <>
                  <FiImage className="w-6 h-6 text-slate-400 group-hover:text-teal-500 mb-1" />
                  <span className="text-[10px] font-black text-slate-400 group-hover:text-teal-500 uppercase tracking-tighter">Segunda</span>
                  <input ref={inputRef2} type="file" accept="image/*" name="imagenPrincipal" id="imagenPrincipal" hidden onChange={(e) => handleUpload(e, 1)} />
                </>
              )}
            </div>

            {/* Secondary 2 */}
            <div
              onClick={() => inputRef3.current?.click()}
              className="w-[85px] h-[85px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center bg-slate-50 group cursor-pointer hover:border-teal-500/50 hover:bg-teal-50/30 transition-all"
            >
              {images[2].preview ? (
                <Image src={images[2].preview} alt="Principal" width={85} height={85} className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <>
                  <FiImage className="w-6 h-6 text-slate-400 group-hover:text-teal-500 mb-1" />
                  <span className="text-[10px] font-black text-slate-400 group-hover:text-teal-500 uppercase tracking-tighter">Tercera</span>
                  <input ref={inputRef3} type="file" accept="image/*" name="imagenPrincipal" id="imagenPrincipal" hidden onChange={(e) => handleUpload(e, 2)} />
                </>
              )}
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
