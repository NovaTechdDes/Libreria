'use server';
import { revalidatePath } from 'next/cache';
import { BannerImage } from '../components/banners/BannerForm';
import { uploadImageBanner } from '../helper/uploadImages';
import { Banner } from '../interface/Banner';
import { createClient } from '../lib/server';

export const postBanner = async (banner: Banner, image: BannerImage): Promise<boolean> => {
  try {
    const supabase = await createClient();

    //1. Cargar Banner en supabase
    const { data: bannerInsertado, error: errorInsertarBanner } = await supabase
      .from('banners')
      .insert({
        titulo: banner.titulo,
        subtitulo: banner.subtitulo,
        activo: banner.activo,
      })
      .select()
      .single();

    if (errorInsertarBanner) throw new Error('Error al insertar el banner');

    //1. Subir Imagen del banner al storage
    const urlImagen = await uploadImageBanner(image, bannerInsertado);

    const { error: errorModificarBanner } = await supabase
      .from('banners')
      .update({
        imagen_url: urlImagen,
      })
      .eq('id', bannerInsertado.id);

    if (errorModificarBanner) throw new Error('Error al cargar la imagen del banner');

    revalidatePath('/admin/banners');

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const putBanner = async (banner: Banner, image: BannerImage): Promise<boolean> => {
  try {
    const supabase = await createClient();

    //1. Eliminar imagen anterior si existe
    if (image.url) {
      await supabase.storage.from('banners').remove([image.url]);

      //2. Cargar nueva imagen
      const urlImagen = await uploadImageBanner(image, banner);

      //3. Actualizar banner con nueva imagen
      const { error: errorModificarBanner } = await supabase
        .from('banners')
        .update({
          titulo: banner.titulo,
          subtitulo: banner.subtitulo,
          activo: banner.activo,
          imagen_url: urlImagen,
        })
        .eq('id', banner.id);

      if (errorModificarBanner) throw new Error('Error al modificar el banner');

      return true;
    }

    //4. Actualizar banner sin imagen
    const { error: errorModificarBanner } = await supabase
      .from('banners')
      .update({
        titulo: banner.titulo,
        subtitulo: banner.subtitulo,
        activo: banner.activo,
      })
      .eq('id', banner.id);

    if (errorModificarBanner) throw new Error('Error al modificar el banner');

    revalidatePath('/admin/banners');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const putStatusBanner = async (id: number, activo: boolean): Promise<boolean> => {
  try {
    const supabase = await createClient();

    const { error: errorModificarBanner } = await supabase.from('banners').update({ activo }).eq('id', id);

    if (errorModificarBanner) throw new Error('Error al modificar el estado del banner');

    revalidatePath('/admin/banners');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteBanner = async (id: number) => {
  try {
    const supabase = await createClient();

    //1. Eliminar imagen del banner si existe
    const { data: banner, error: errorObtenerBanner } = await supabase.from('banners').select('imagen_url').eq('id', id).single();

    if (errorObtenerBanner) throw new Error('Error al obtener el banner');

    if (banner.imagen_url) {
      // Extraer el nombre del archivo de la URL
      const nombreArchivo = banner.imagen_url.split('/').pop();
      if (nombreArchivo) {
        await supabase.storage.from('banners').remove([`banners/${nombreArchivo}`]);
      }
    }

    //2. Eliminar banner
    const { error: errorEliminarBanner } = await supabase.from('banners').delete().eq('id', id);

    if (errorEliminarBanner) throw new Error('Error al eliminar el banner');

    revalidatePath('/admin/banners');

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
