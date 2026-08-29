import { apiRequest } from '@/api/apiClient';
import { Rubro, SubRubro } from '@/interface';
import { mapRubro, mapSubRubro } from '@/mappers/rubro.mappers';

export const getRubros = async (servidor: boolean): Promise<{ rubros: Rubro[]; subRubros: SubRubro[] }> => {
  try {
    const data = await apiRequest(servidor, {
      url: '/rubro',
      method: 'GET',
      params: {
        servidor,
      },
    });

    const rubros = data?.data?.map(mapRubro);
    const subRubros = data?.subrubros?.map(mapSubRubro);

    return { rubros, subRubros };
  } catch (error) {
    console.error(error);
    return {
      rubros: [],
      subRubros: [],
    };
  }
};
