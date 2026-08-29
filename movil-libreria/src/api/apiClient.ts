import { getUrl } from '@/utils/getURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';

export const getBaseUrl = async (servidor: boolean): Promise<string> => {
  if (servidor) {
    const urlRemoto = await AsyncStorage.getItem('url_remoto');
    return urlRemoto ? `https://${urlRemoto}` : '';
  }

  const urlLocal = await getUrl();
  return urlLocal ? `http://${urlLocal}` : '';
};

export const apiRequest = async <T = any>(servidor: boolean, config: AxiosRequestConfig, usuario?: string): Promise<T | null> => {
  try {
    const baseURL = await getBaseUrl(servidor);
    if (!baseURL) {
      console.warn('No hay URL configurada para el servidor:', servidor ? 'Remoto' : 'Local');
      return null;
    }

    const headers: Record<string, string> = {
      ...(config.headers as Record<string, string>),
    };

    if (usuario) {
      headers['Authorization'] = `Bearer ${usuario}`;
    }

    const response = await axios({
      ...config,
      baseURL,
      headers,
      timeout: config.timeout || 8000,
    });
    return response.data;
  } catch (error: any) {
    console.error(`[API Error] ${config.method?.toUpperCase() || 'GET'} ${config.url}:`, error?.message || error);
    return null;
  }
};
