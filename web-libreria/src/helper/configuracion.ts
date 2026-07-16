'use server';
import { Configuracion } from '../interface/Configuracion';
import { getConfiguracion as getConfiguracionService } from '../service/configuracion.service';

export async function getConfiguracion(): Promise<Configuracion> {
  try {
    const { configuracion, ok, msg } = await getConfiguracionService();
    if (!ok) {
      throw new Error(msg || 'Error al obtener la configuración desde el servicio');
    }
    const { carrito_habilitado, fecha_fin, fecha_inicio, frase_descuento, id, mensaje_informativo, porcentaje_descuento } = configuracion;

    return {id, frase_descuento, porcentaje_descuento, mensaje_informativo, carrito_habilitado, fecha_inicio, fecha_fin};
  } catch (error) {
    console.error(error);
    return {
      id: 0,
      frase_descuento: '',
      porcentaje_descuento: 0,
      mensaje_informativo: '',
      carrito_habilitado: true,
      fecha_inicio: new Date().toISOString(),
      fecha_fin: new Date().toISOString(),
    };
  }
}
