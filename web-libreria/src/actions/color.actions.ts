'use server';
import { revalidatePath } from 'next/cache';
import { api } from '../service';

export const putColor = async (id: number, color: string, codigo: string): Promise<boolean> => {
  try {
    const { data } = await api.put(`api/colores/${id}`, {color, codigo});

    if(!data.ok) {
        throw new Error(data.msg);
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
    const { data } = await api.post('api/colores', {color, codigo});

    if(!data.ok) {
        throw new Error(data.msg);
    }
    revalidatePath('/admin/colores');

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
