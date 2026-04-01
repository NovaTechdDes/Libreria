import { getUrl } from '@/utils/getURL';
import axios from 'axios';

export const probarConexion = async (): Promise<boolean> => {
  console.log('Probar conexion');
  console.log(await getUrl());
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
