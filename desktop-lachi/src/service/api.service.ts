import axios from 'axios';
import { getServerUrl } from './store.service';

const api = axios.create({
  timeout: 10000
});

api.interceptors.request.use((config) => {
  const serverURL = getServerUrl();
  config.baseURL = `${serverURL}/`;
  return config;
});

export default api;