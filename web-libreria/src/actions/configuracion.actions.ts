'use server';

import { createClient } from '../lib/server';

export const putDescuentoConfig = async (porcentaje: number, frase: string): Promise<boolean> => {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from('configuracion')
      .update({
        porcentaje_descuento: porcentaje,
        frase_descuento: frase,
      })
      .eq('id', 1);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};


export const putBannerConfig = async (mensaje: string, habilitado: boolean): Promise<boolean> => {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from('configuracion')
      .update({
        mensaje_informativo: mensaje,
        carrito_habilitado: habilitado,
      })
      .eq('id', 1);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};