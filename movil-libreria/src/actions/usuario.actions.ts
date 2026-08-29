import { apiRequest } from '@/api/apiClient';
import { Usuario } from '@/interface';
import { mapUsuario } from '@/mappers/usuario.mappers';

const usuarioVacio: Usuario = {
  id_usuario: '0',
  denominacion: '',
  clave: '',
  administrador: false,
};

export const getUsuarioByClave = async (clave: string, servidor: boolean): Promise<Usuario> => {
  try {
    if (!clave) {
      return usuarioVacio;
    }

    const data = await apiRequest(servidor, {
      url: `/usuarios/${clave}`,
      method: 'GET',
      params: {
        servidor,
      },
    });

    return data?.data ? mapUsuario(data.data) : usuarioVacio;
  } catch (error) {
    console.error(error);
    return usuarioVacio;
  }
};
