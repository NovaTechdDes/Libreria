import { mapRubro } from '@/mappers/rubro.mappers';
import { getUrl } from '@/utils/getURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const getRubros = async (servidor: boolean) => {
  let URL = '';

  if (servidor) {
    URL = `https://${(await AsyncStorage.getItem('url_remoto')) ?? ''}`;
  } else {
    URL = `http://${await getUrl()}`;
  }

  try {
    const { data } = await axios.get(`${URL}/rubro/`, {
      params: {
        servidor,
      },
    });

    return data.data.map(mapRubro);
  } catch (error) {
    console.log(error);
    return [];
  }
};
