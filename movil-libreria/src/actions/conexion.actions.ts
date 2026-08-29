import { apiRequest } from '@/api/apiClient';

export const probarConexion = async (servidor: boolean = false): Promise<boolean> => {
  try {
    const data = await apiRequest(servidor, {
      url: '/test',
      method: 'GET',
    });
    return Boolean(data);
  } catch (error) {
    return false;
  }
};
