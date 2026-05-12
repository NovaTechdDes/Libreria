import { createClient } from '../lib/server';
import { ImageItem } from '../components/admin/inventario/FormularioProducto';

export async function uploadImages(imagenes: ImageItem[], productoId: number) {
  const supabase = await createClient();

  //Guardar Imagenes
  const uploadedURLS: string[] = [];

  for (const image of imagenes) {
    if (!image.file) continue;

    const fileExt = image.file.name.split('.').pop();
    const fileName = `${productoId}-${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage.from('productos').upload(`productos/${fileName}`, image.file);

    if (error) {
      console.error(error);
      continue;
    }

    const { data } = await supabase.storage.from('productos').getPublicUrl(`productos/${fileName}`);

    uploadedURLS.push(data.publicUrl);
  }

  return uploadedURLS;
}
