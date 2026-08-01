import { Producto_Visto } from '../interface/Producto_Visto';
import api from './api.service';

export const getProductosMasVistos = async (fecha: Date): Promise<Producto_Visto[]> => {
  try {
    const { data } = await api.get('api/productos_vistos', {
        params: {
            fecha
        }
    });

    if(!data.ok) throw new Error(data.msg);
    
    return data.productosVistos;
  } catch (error) {
    console.error('Error al obtener productos más vistos:', error);
    return [];
  }
};

export const postProductosVistos = async (productosVistos: Producto_Visto) => {
  try {
    const { data } = await api.post('api/productos_vistos', productosVistos);

    if(!data.ok) throw new Error(data.msg);
    
    return data;
  } catch (error) {
    console.error('Error al obtener productos más vistos:', error);
    return [];
  }
};

