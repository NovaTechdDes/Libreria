'use server';
import { createClient } from '@/src/lib/server';
import { Configuracion } from '../interface/Configuracion';

export async function getConfiguracion(): Promise<Configuracion> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('configuracion').select('*').limit(1);

    if (error) {
      console.error(error);
      return {
        id: 0,
        frase_descuento: '',
        porcentaje_descuento: 0,
        mensaje_informativo: '',
        carrito_habilitado: true,
        fecha_inicio: new Date(),
        fecha_fin: new Date(),
      };
    }

    return data[0];
  } catch (error) {
    console.error(error);
    return {
      id: 0,
      frase_descuento: '',
      porcentaje_descuento: 0,
      mensaje_informativo: '',
      carrito_habilitado: true,
    };
  }
}
