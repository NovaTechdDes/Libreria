'use server';
import { api } from '../service';

export const putDescuentoConfig = async (porcentaje: number, frase: string): Promise<boolean> => {
  try {

    const { data } = await api.put('/api/configuracion/descuento', {
      porcentaje_descuento: porcentaje,
      frase_descuento: frase,
      id: 1
    })

    if(!data.ok) return false;

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const putBannerConfig = async (mensaje: string, fecha_inicio: string, fecha_fin: string, habilitado: boolean): Promise<boolean> => {
  try {
    const { data } = await api.put('/api/configuracion/banner',{
      id: 1,
      mensaje_informativo: mensaje,
      fecha_inicio: fecha_inicio,
      fecha_fin: fecha_fin,
      carrito_habilitado: habilitado,
    })

    if(!data.ok) return false;

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
