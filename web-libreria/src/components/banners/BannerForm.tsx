'use client';
import React, { useEffect, useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import NextImage from 'next/image';
import { BannerSlide } from '@/src/components/public/BannerSlide';
import { useMutateBanner } from '@/src/hooks/banner/useMutateBanner';
import { Banner } from '@/src/interface/Banner';
import { mensaje } from '@/src/helper/mensaje';
import { useBannerStore } from '@/src/store/banner.store';

export type BannerImage = {
  file: File | null;
  preview: string | null;
  url?: string;
};

export const BannerForm = () => {
  const { banner, setBanner } = useBannerStore();
  const { startPostBanner, startUpdateBanner } = useMutateBanner();

  const [formData, setFormData] = useState({
    titulo: '',
    subtitulo: '',
  });
  const [image, setImage] = useState<BannerImage>({ file: null, preview: null });
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (banner) {
      setFormData({
        titulo: banner.titulo || '',
        subtitulo: banner.subtitulo || '',
      });
      // También podrías cargar la preview de la imagen si existe
      setImage({
        file: null,
        preview: banner.imagen_url || null,
      });
    }
  }, [banner]);

  const handleChangeIMG = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newImage: BannerImage = {
      file,
      preview: URL.createObjectURL(file),
    };

    setImage(newImage);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBanner = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (banner?.id) {
      const bannerActualizado: Banner = {
        id: banner.id,
        titulo: formData.titulo,
        subtitulo: formData.subtitulo,
        activo: true,
        imagen_url: '',
      };

      const res = await startUpdateBanner.mutateAsync({ banner: bannerActualizado, image });

      if (res) {
        mensaje('Banner actualizado exitosamente', 'success');
        clear();
      } else {
        mensaje('Error al actualizar el banner', 'error');
      }
      return;
    }

    const bannerNuevo: Banner = {
      titulo: formData.titulo,
      subtitulo: formData.subtitulo,
      activo: true,
      imagen_url: '',
    };

    const res = await startPostBanner.mutateAsync({ banner: bannerNuevo, image });

    if (res) {
      mensaje('Banner agregado exitosamente', 'success');
      clear();
    } else {
      mensaje('Error al agregar el banner', 'error');
    }
  };

  const clear = () => {
    setFormData({
      titulo: '',
      subtitulo: '',
    });
    setImage({
      file: null,
      preview: null,
    });

    setBanner(null);
  };

  return (
    <form onSubmit={handleAddBanner} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6 sticky top-6">
      <h2 className="text-xl font-bold text-slate-800">Cargar/Editar Banner</h2>

      {/* Upload Zone */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subir Imagen</label>
        <div
          onClick={handleUploadClick}
          className="border-2 border-dashed border-slate-400 rounded-3xl p-3 flex flex-col items-center justify-center text-center gap-3 hover:border-teal-500 transition-colors cursor-pointer bg-slate-50/50 overflow-hidden relative min-h-[120px]"
        >
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleChangeIMG} />

          {image.preview ? <NextImage src={image.preview} alt="Preview Banner" fill className="object-cover opacity-40" /> : <FiUploadCloud className="text-slate-300 text-3xl" />}

          <div className="relative z-10 space-y-1">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{image.preview ? 'Cambiar Imagen' : 'Click para subir imagen'}</p>
            {!image.preview && <p className="text-[9px] text-slate-300">JPG, PNG hasta 5MB</p>}
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Titulo del Banner</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleInputChange}
            placeholder="Ej: Especial de Verano"
            className="w-full bg-slate-50 border text-black border-slate-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subtitulo del Banner</label>
          <div className="relative">
            <input
              type="text"
              name="subtitulo"
              value={formData.subtitulo}
              onChange={handleInputChange}
              placeholder="Ej: Promoción por tiempo limitado"
              className="w-full bg-slate-50 border text-black border-slate-400 rounded-xl pl-4 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Vista Previa (Como se verá en la web)</label>
        <div className="w-full border-slate-800 border rounded-3xl overflow-hidden">
          <BannerSlide titulo={formData.titulo} subtitulo={formData.subtitulo} imagen_url={image.preview || ''} />
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={clear} className="flex-1 px-4 py-3 rounded-xl border border-slate-400 text-slate-500 font-bold text-sm hover:bg-slate-50 transition-colors">
          Cancelar
        </button>
        <button type="submit" className="flex-2 px-6 py-3 rounded-xl bg-teal-500 text-white font-bold text-sm shadow-lg shadow-teal-500/30 hover:bg-teal-600 transition-all">
          {banner ? 'Actualizar Banner' : 'Guardar Banner'}
        </button>
      </div>
    </form>
  );
};
