import { mapCaja } from '@/mappers/caja.mappers';
import { getUrl } from '@/utils/getURL';
import axios from 'axios';

export const getMovCajas = async () => {
  try {
    const url = `http://${await getUrl()}/caja`;
    const { data } = await axios.get(url);

    if (data.ok) {
      return data.data.map(mapCaja);
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getVales = async () => {
  try {
    const url = `http://${await getUrl()}/caja/vales`;
    const { data } = await axios.get(url);

    if (data.ok) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const startCierreCaja = async (): Promise<boolean> => {
  try {
    const url = `http://${await getUrl()}/caja/cierre`;
    const { data } = await axios.post(url);
    if (data.ok) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
