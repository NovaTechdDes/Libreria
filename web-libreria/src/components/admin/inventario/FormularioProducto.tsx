'use client';

import { useProductoStore } from '@/src/store/producto.store';
import { FiPlus, FiUploadCloud, FiCamera, FiImage, FiX } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { ModalColores } from './ModalColores';
import { ColorFormularioItem } from './ColorFormularioItem';

import { useRef } from 'react';
import Image from 'next/image';
import { useMutateProductos } from '@/src/hooks/productos/useMutateProductos';
import { mensaje } from '@/src/helper/mensaje';
import Swal from 'sweetalert2';
import { useCreateVariante, useDeleteVariante } from '@/src/hooks/variante/useVariante';
import { BiLoader, BiTrash } from 'react-icons/bi';
import { productos_variantes } from '@/src/interface/Variantes';
import { useProductoById } from '@/src/hooks/productos/useProducto';
import { Color } from '@/src/interface/Color';
import { Loading } from '../../ui/Loading';

export type ImageItem = {
  file: File | null;
  preview: string | null;
  url?: string;
};

export const FormularioProducto = () => {
  const { productoSeleccionado, coloresSeleccionados, removeColor, addColores, clearProductoSeleccionado} = useProductoStore();

  const { startUpdateProducto } = useMutateProductos();

  const { mutateAsync, isPending:isPendingVariante } = useCreateVariante();
  const deleteVariante = useDeleteVariante();

  const { data: producto, isLoading } = useProductoById(productoSeleccionado!);


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
    if (!producto?.id_producto || !producto?.productos_colores) return;


    addColores([...producto?.productos_colores.map((c: Color) => c)]);
  }, [producto, addColores]);

  useEffect(() => {
      if (!producto?.id_producto || !producto?.url_imagenes) return;

      producto.url_imagenes.forEach((imagen, i)  =>  {
        if(imagen.nombre_archivo && i < 3) {
          setImages(prev => {
            const newImages = [...prev];
            newImages[i] = {
              file: null,
              preview: imagen.nombre_archivo
            };
            return newImages;
          })
        }
      });
  }, [producto, productoSeleccionado]);

  if (!productoSeleccionado) return null;

  const handleUpdate = async () => {
    if (!producto) return;

    const res = await startUpdateProducto.mutateAsync({ colores: coloresSeleccionados, imagenes: images, id: producto.id_producto });

    if (res) {
      mensaje('Producto Actualizado Correctamente', 'success');
    } else {
      mensaje('Error al actualizar el producto', 'error');
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newImages = [...images];
    newImages[index] = {
      file,
      preview: URL.createObjectURL(file),
    };

    setImages(newImages);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages[index] = { file: null, preview: null };
    setImages(newImages);
  };

  const handleAddVariante = async () => {
    if(!producto) return;
    const {isConfirmed, value} = await Swal.fire({
      text: `Agregar Variante de ${producto?.descripcion}`,
      input: 'text',
      showCancelButton: true,
      confirmButtonText: "Agregar",
      cancelButtonText: "Cancelar",
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage("Por favor ingresa un nombre");
        }
        return value;
      }
    });
    
    if(isConfirmed && value){
      const res = await mutateAsync({productoId: producto.id_producto, nombre: value});

      if(res){
        mensaje("Variante agregada correctamente", "success");
      }else{
        mensaje("Error al agregar la variante", "error");
      }
    } 
  };

  const handleDeleteVariante = async (id: number) => {
    const {isConfirmed} = await Swal.fire({
      title: `Seguro quiere eliminar la variante`,
      confirmButtonText: "Eliminar",
      showCancelButton: true
    });

    if(isConfirmed){
      const res = await deleteVariante.mutateAsync({idVariante: id, productoId: productoSeleccionado});

      if(res) {
        mensaje('Variante eliminada correctamente', 'success')
      }else{
        
        mensaje('Error al eliminar la variante', 'error')
      }
    }
  }

  if(isLoading || !producto) return (
    <Loading/>
  )

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
          <p className="text-black font-bold text-2xl">{producto.descripcion}</p>
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
                <div className="relative w-full h-full group/image">
                  <Image src={images[0].preview} alt="Principal" width={85} height={85} className="w-full h-full object-cover rounded-2xl" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(0);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover/image:opacity-100 transition-opacity z-10"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </div>
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
                <div className="relative w-full h-full group/image">
                  <Image src={images[1].preview} alt="Principal" width={85} height={85} className="w-full h-full object-cover rounded-2xl" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(1);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover/image:opacity-100 transition-opacity z-10"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </div>
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
                <div className="relative w-full h-full group/image">
                  <Image src={images[2].preview} alt="Principal" width={85} height={85} className="w-full h-full object-cover rounded-2xl" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(2);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover/image:opacity-100 transition-opacity z-10"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </div>
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
        <div className='border border-gray-500 rounded-lg p-2'>
          <label className="block text-[14px] font-bold text-slate-700 mb-3">Colores Disponibles</label>
          <div className="flex flex-wrap items-center gap-3">
            {coloresSeleccionados.map((color, i) => (
              <ColorFormularioItem removeColor={removeColor} key={i} color={color} />
            ))}
            <button
              onClick={handleModal}
              disabled={isPendingVariante}
              className="w-10 h-10 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 hover:border-teal-500 hover:text-teal-500 transition-all"
            >
              {isPendingVariante ? <BiLoader className="w-5 h-5 animate-spin text-teal-500" /> : <FiPlus className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-[10px] font-black text-slate-400 mt-3 tracking-widest uppercase">Click para agregar nuevo tono</p>
        </div>

            {/* Variantes */}
        <div className='border border-gray-500 rounded-lg p-2'>
          <div className="flex justify-between">
            <label className="block text-[14px] font-bold text-slate-700 mb-3">Agregar variante</label>
          <button onClick={handleAddVariante} className="flex items-center cursor-pointer hover:bg-[#008199] transition-all gap-2 bg-[#0096B1] text-white rounded-full p-2  font-bold">
            <FiPlus size={25}/>
          </button>
          </div>
          <div className='flex flex-wrap items-center gap-3 border rounded-lg border-gray-200 max-h-50 mt-5 overflow-y-auto p-3'>
            {producto.tiene_variantes ? (
              <div className='space-y-2 w-full'>
                {producto?.productos_variantes?.map((variante: productos_variantes) => <VarianteItem handleDeleteVariante={handleDeleteVariante} key={variante.id} variante={variante}/>)}
              </div>
            ) : (
              <p>Producto sin variantes</p>
            )}
          </div>
        </div>

        {/* Submit */}
       <div className='flex gap-5 items-center'>
         <button
          onClick={handleUpdate}
          className=" bg-[#0096B1] text-white rounded-[20px] py-4.5 px-6 font-bold flex items-center justify-center gap-3 shadow-lg shadow-teal-100 hover:bg-[#008199] transition-all mt-4 group"
        >
          <FiUploadCloud className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
          <span className="text-[17px]">Actualizar Producto</span>
        </button>

        <button
        onClick={clearProductoSeleccionado}
        className=' bg-gray-50 border-gray-500 border text-gray-500 py-2 px-6 font-bold flex items-center justify-center gap-3 rounded-lg hover:bg-gray-200 transition-all mt-4'>
          Cancelar
        </button>
       </div>
      </div>

      {showColores && <ModalColores isOpen={showColores} onClose={handleModal} />}
    </div>
  );
};


const VarianteItem = ({variante, handleDeleteVariante}: {variante: productos_variantes, handleDeleteVariante: (id: number) => void}) => {


  return (
    <div className="flex items-center justify-between p-3 rounded-xl border border-slate-300 bg-white">
      <span className='font-medium text-slate-700'>{variante.nombre}</span>
      <button type='button' onClick={() => handleDeleteVariante(variante.id)} className='p-2 rounded-lg cursor-pointer hover:bg-red-50 text-red-500 transition'>
        <BiTrash size={18}/>
      </button>
    </div>
  )
}