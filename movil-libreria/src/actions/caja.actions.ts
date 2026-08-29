import { apiRequest } from '@/api/apiClient';
import { mapCaja } from '@/mappers/caja.mappers';

export const getMovCajas = async (servidor: boolean) => {
  try {
    const res = await apiRequest(servidor, {
      url: '/caja',
      method: 'GET',
      params: {
        servidor,
      },
    });

    return res?.data ? res.data.map(mapCaja) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getVales = async (servidor: boolean, usuario: string) => {
  try {
    const res = await apiRequest(servidor, {
      url: '/caja/vales',
      method: 'GET',
      params: {
        servidor,
      },
    });

    return res?.data ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const startCierreCaja = async (servidor: boolean, usuario: string): Promise<boolean> => {
  try {
    const res = await apiRequest(servidor, {
      url: '/caja/cierre',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${usuario}`,
      },
    });

    return res?.ok ?? false;
  } catch (error) {
    console.error(error);
    return false;
  }
};
