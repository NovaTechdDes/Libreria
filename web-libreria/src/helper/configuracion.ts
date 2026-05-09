'use server';
import { createClient } from '@/src/lib/server';
import { Configuracion } from '../interface/Configuracion';

export async function getConfiguracion(): Promise<Configuracion> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('configuracion').select('*').limit(1);

    if (error) {
      console.log(error);
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

export async function putBannerConfig(body: { mensaje: string; habilitado: boolean }) {
  try {
    const { rows } = await pool.query(
      `
        UPDATE configuracion SET mensaje_informativo = $1, carrito_habilitado = $2 RETURNING * 
        `,
      [body.mensaje, body.habilitado]
    );
    return rows[0];
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function putDescuentoConfig(body: { mensaje: string; porcentaje: number }) {
  try {
    const { command } = await pool.query(
      `
        UPDATE configuracion SET frase_descuento = $1, porcentaje_descuento = $2 RETURNING * 
        `,
      [body.mensaje, body.porcentaje]
    );
    if (command === 'UPDATE') {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}
