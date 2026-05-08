import { Producto } from '@/interface';
import { mapProducto, mapProductoBackend } from '@/mappers/producto.mappers';
import { getUrl } from '@/utils/getURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const getProductos = async (search: string, servidor: boolean, id_rubro: number | null, id_subrubro: number | null): Promise<Producto[]> => {
  let URL = '';

  if (servidor) {
    URL = `https://${(await AsyncStorage.getItem('url_remoto')) ?? ''}`;
  } else {
    URL = `http://${await getUrl()}`;
  }

  try {
    const { data } = await axios.get(`${URL}/productos/`, {
      params: {
        search: search || undefined,
        limit: 100,
        servidor,
        id_rubro: id_rubro || 0,
        id_subrubro: id_subrubro || 0,
      },
    });
    return data.data.map(mapProducto);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const putProducto = async (producto: Partial<Producto>, servidor: boolean, usuario: string): Promise<Producto | null> => {
  let URL = '';

  if (servidor) {
    URL = `https://${(await AsyncStorage.getItem('url_remoto')) ?? ''}`;
  } else {
    URL = `http://${await getUrl()}`;
  }
  try {
    const { data } = await axios.put(`${URL}/productos/${producto.id}`, mapProductoBackend(producto), {
      timeout: 4000,
      headers: {
        Authorization: `Bearer ${usuario}`,
      },
    });

    if (data.ok) {
      return mapProducto(data.data);
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
