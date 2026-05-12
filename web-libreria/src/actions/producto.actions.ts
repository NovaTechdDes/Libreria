'use server';

import { ImageItem } from '../components/admin/inventario/FormularioProducto';
import { uploadImages } from '../helper/uploadImages';
import { Color } from '../interface/Color';
import { createClient } from '../lib/server';
import { revalidatePath } from 'next/cache';

export const updateVisibilidadProducto = async (activo: boolean, id: number): Promise<boolean> => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from('productos').update({ activo }).eq('id_producto', id);
    if (error) throw error;

    revalidatePath('/admin/inventario');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updatePrecioVisibleProducto = async (activo: boolean, id: number): Promise<boolean> => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from('productos').update({ isvisibleprecio: activo }).eq('id_producto', id);
    if (error) throw error;

    revalidatePath('/admin/inventario');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateStockVisibleProducto = async (activo: boolean, id: number): Promise<boolean> => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from('productos').update({ isstock: activo }).eq('id_producto', id);
    if (error) throw error;

    revalidatePath('/admin/inventario');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateProducto = async (colores: Color[], imagenes: ImageItem[], id: number): Promise<boolean> => {
  try {
    const supabase = await createClient();

    const urls = await uploadImages(imagenes, id);

    //Guardar URL de las imaganes
    await supabase.from('productos').update({ imagenes: urls }).eq('id_producto', id);

    //Eliminar relaciones de colores con el producto
    const { error } = await supabase.from('productos_colores').delete().eq('id_producto', id);
    console.log({ error, id });
    if (error) throw error;

    //Insertar nuevas relaciones de colores con el producto
    if (colores.length > 0) {
      const dataToInsert = colores
        .filter((c) => c.id !== undefined)
        .map((c) => ({
          id_producto: id,
          id_color: c.id,
        }));

      if (dataToInsert.length > 0) {
        const { error: ErrorInsert } = await supabase.from('productos_colores').insert(dataToInsert);
        if (ErrorInsert) throw ErrorInsert;
      }
    }

    revalidatePath('/admin/inventario');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
