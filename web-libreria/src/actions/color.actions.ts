'use server';
import { createClient } from '../lib/server';
import { revalidatePath } from 'next/cache';

export const putColor = async (id: number, color: string, codigo: string): Promise<boolean> => {
  try {
    const supabase = await createClient();

    const { error } = await supabase.from('colores').update({ color, codigo }).eq('id', id);

    if (error) {
      throw error;
    }

    revalidatePath('/admin/colores');

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const postColor = async (color: string, codigo: string): Promise<boolean> => {
  try {
    const supabase = await createClient();

    const { error } = await supabase.from('colores').insert({ color, codigo });

    if (error) {
      throw error;
    }

    revalidatePath('/admin/colores');

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
