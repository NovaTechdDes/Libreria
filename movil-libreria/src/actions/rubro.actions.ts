import { Rubro, SubRubro } from '@/interface';
import { mapRubro, mapSubRubro } from '@/mappers/rubro.mappers';
import { getUrl } from '@/utils/getURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const getRubros = async (servidor: boolean): Promise<{ rubros: Rubro[]; subRubros: SubRubro[] }> => {
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

    const rubros = data?.data?.map(mapRubro);
    const subRubros = data?.subrubros?.map(mapSubRubro);

    return { rubros, subRubros };
  } catch (error) {
    console.log('El error es');
    console.error(error);
    return {
      rubros: [],
      subRubros: [],
    };
  }
};
