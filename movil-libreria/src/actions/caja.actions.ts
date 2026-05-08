import { mapCaja } from '@/mappers/caja.mappers';
import { getUrl } from '@/utils/getURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const getMovCajas = async (servidor: boolean) => {
  try {
    let URL = '';

    if (servidor) {
      URL = `https://${(await AsyncStorage.getItem('url_remoto')) ?? ''}`;
    } else {
      URL = `http://${await getUrl()}`;
    }

    const { data } = await axios.get(`${URL}/caja`);

    if (data.ok) {
      return data.data.map(mapCaja);
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getVales = async (servidor: boolean, usuario: string) => {
  try {
    let URL = '';

    if (servidor) {
      URL = `https://${(await AsyncStorage.getItem('url_remoto')) ?? ''}`;
    } else {
      URL = `http://${await getUrl()}`;
    }

    const { data } = await axios.get(`${URL}/caja/vales`);

    if (data.ok) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const startCierreCaja = async (servidor: boolean, usuario: string): Promise<boolean> => {
  try {
    let URL = '';

    if (servidor) {
      URL = `https://${(await AsyncStorage.getItem('url_remoto')) ?? ''}`;
    } else {
      URL = `http://${await getUrl()}`;
    }

    const { data } = await axios.post(
      `${URL}/caja/cierre`,
      {},
      {
        headers: {
          Authorization: `Bearer ${usuario}`,
        },
      }
    );
    if (data.ok) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};
