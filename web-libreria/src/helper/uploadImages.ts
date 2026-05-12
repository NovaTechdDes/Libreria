import { createClient } from '../lib/server';
import { ImageItem } from '../components/admin/inventario/FormularioProducto';

export async function uploadImages(imagenes: ImageItem[], productoId: number) {
  const supabase = await createClient();

  const finalURLS: string[] = [];

  for (const image of imagenes) {
    // Si tiene un archivo, lo subimos
    if (image.file) {
      const fileExt = image.file.name.split('.').pop();
      const fileName = `${productoId}-${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;

      const { error } = await supabase.storage.from('productos').upload(`productos/${fileName}`, image.file);

      if (error) {
        console.error('Error al subir imagen:', error);
        continue;
      }

      const { data } = await supabase.storage.from('productos').getPublicUrl(`productos/${fileName}`);
      finalURLS.push(data.publicUrl);
    } 
    // Si no tiene archivo pero sí una preview que ya es una URL, la mantenemos
    else if (image.preview && image.preview.startsWith('http')) {
      finalURLS.push(image.preview);
    }
  }

  return finalURLS;
}
