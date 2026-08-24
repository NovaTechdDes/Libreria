'use server';
import { revalidatePath } from 'next/cache';
import { api } from '../service';

export const updateDescuentoRubro = async (id: number, descuento: number): Promise<boolean> => {
  try {
    const { data } = await api.put(`/api/rubros/descuento/${id}`, {descuento});

    revalidatePath('/admin/rubros');
    return data.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};
