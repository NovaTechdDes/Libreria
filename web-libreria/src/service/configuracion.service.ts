import { Configuracion } from "../interface/Configuracion";
import api from "./api.service";

interface ReturnConfiguracion {
    ok: boolean;
    configuracion: Configuracion;
    msg?: string;
}

export const getConfiguracion = async(): Promise<ReturnConfiguracion> => {
    try {
        const { data } = await api.get('api/configuracion');
        if(!data.ok){
            return {
                ok: false,
                configuracion: {
                    id: 0,
                    frase_descuento: '',
                    porcentaje_descuento: 0,
                    mensaje_informativo: '',
                    carrito_habilitado: true,
                    fecha_inicio: new Date().toISOString(),
                    fecha_fin: new Date().toISOString(),
                },
                msg: data.msg
            }
        }
        return {
            ok: true,
            configuracion: data.configuracion
        }
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            msg: 'Error al obtener la configuración',
            configuracion: {
                id: 0,
                frase_descuento: '',
                porcentaje_descuento: 0,
                mensaje_informativo: '',
                carrito_habilitado: true,
                fecha_inicio: new Date().toISOString(),
                fecha_fin: new Date().toISOString(),
            }
        }
    }
}