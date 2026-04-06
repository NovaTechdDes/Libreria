import { Usuario } from '@/interface';
import { mapUsuario } from '@/mappers/usuario.mappers';
import { getUrl } from '@/utils/getURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const getUsuarioByClave = async (clave: string, servidor: boolean): Promise<Usuario> => {
  try {
    if (!clave) {
      return {
        id_usuario: '0',
        denominacion: '',
        clave: '',
        administrador: false,
      };
    }
    let URL = '';

    if (servidor) {
      URL = (await AsyncStorage.getItem('url_remoto')) ?? '';
    } else {
      URL = `http://${await getUrl()}`;
    }

    const { data } = await axios.get(`${URL}/usuarios/${clave}`);

    if (!data) {
      return {
        id_usuario: '0',
        denominacion: '',
        clave: '',
        administrador: false,
      };
    }

    return mapUsuario(data.data);
  } catch (error) {
    console.log(error);
    return {
      id_usuario: '0',
      denominacion: '',
      clave: '',
      administrador: false,
    };
  }
};
