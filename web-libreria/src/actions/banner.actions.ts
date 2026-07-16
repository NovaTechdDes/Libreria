'use server';
import { revalidatePath } from 'next/cache';
import { BannerImage } from '../components/banners/BannerForm';
import { Banner } from '../interface/Banner';
import { api } from '../service';

export const postBanner = async (banner: Banner, image: BannerImage): Promise<boolean> => {
  try {
    const formData = new FormData();

    formData.append('titulo', banner.titulo);
    formData.append('subtitulo', banner.subtitulo);
    formData.append('activo', banner.activo.toString());
    formData.append('orden', banner.orden!.toString());
    formData.append('image', image.file!);

    const { data } = await api.post('/api/banners', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if(!data.ok){
      throw new Error(data.msg);
    }

    revalidatePath('/admin/banners');

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const putBanner = async (banner: Banner, image: BannerImage): Promise<boolean> => {
  try {
    const formData = new FormData();

    formData.append('titulo', banner.titulo);
    formData.append('subtitulo', banner.subtitulo);
    formData.append('activo', banner.activo.toString());
    formData.append('orden', String(banner.orden ?? 2));
    if(image.file){
      formData.append('image', image.file);
    }

    const { data } = await api.put(`/api/banners/${banner.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if(!data.ok){
      throw new Error(data.msg);
    }

    revalidatePath('/admin/banners');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const putStatusBanner = async (id: number, activo: boolean): Promise<boolean> => {
  try {
    const { data } = await api.put(`/api/banners/status/${id}`, {activo});

    if(!data.ok){
      throw new Error(data.msg);
    }

    revalidatePath('/admin/banners');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteBanner = async (id: number) => {
  try {
   const { data } = await api.delete(`/api/banners/${id}`);

   if(!data.ok){
    throw new Error(data.msg)
   }

    revalidatePath('/admin/banners');

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getBanners = async (): Promise<Banner[] | null> => {
  try {
    const { data } = await api.get('/api/banners');

    if(data.ok){
      return data.banners;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};