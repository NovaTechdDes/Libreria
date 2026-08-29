import { apiRequest } from '@/api/apiClient';
import { mapCaja } from '@/mappers/caja.mappers';

export const getMovCajas = async (servidor: boolean) => {
  try {
    const { data } = await apiRequest(servidor, {
      url: '/caja',
      method: 'GET',
      params: {
        servidor,
      },
    });

    if (data) {
      return data.map(mapCaja);
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getVales = async (servidor: boolean, usuario: string) => {
  try {
    const { data } = await apiRequest(servidor, {
      url: '/caja/vales',
      method: 'GET',
      params: {
        servidor,
      },
    });

    if (data) {
      return data;
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const startCierreCaja = async (servidor: boolean, usuario: string): Promise<boolean> => {
  try {
    const { data } = await apiRequest(servidor, {
      url: '/caja/cierre',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${usuario}`,
      },
    });
    if (data.ok) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};
