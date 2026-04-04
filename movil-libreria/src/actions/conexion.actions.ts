import { getUrl } from '@/utils/getURL';
import axios from 'axios';

export const probarConexion = async (): Promise<boolean> => {
  const URL = `http://${await getUrl()}/test`;
  try {
    const { data } = await axios.get(URL, {
      timeout: 2000,
    });
    return data;
  } catch (error) {
    return false;
  }
};
