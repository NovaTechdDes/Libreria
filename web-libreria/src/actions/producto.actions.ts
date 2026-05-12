'use server';

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
