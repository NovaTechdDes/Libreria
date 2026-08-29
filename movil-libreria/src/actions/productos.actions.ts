import { apiRequest } from '@/api/apiClient';
import { Producto } from '@/interface';
import { mapProducto, mapProductoBackend } from '@/mappers/producto.mappers';

export const getProductos = async (search: string, servidor: boolean, id_rubro: number | null, id_subrubro: number | null, limit: number = 50): Promise<Producto[]> => {
  try {
    const { data } = await apiRequest(servidor, {
      url: '/productos',
      method: 'GET',
      params: {
        search: search || undefined,
        limit,
        servidor,
        id_rubro: id_rubro || 0,
        id_subrubro: id_subrubro || 0,
      },
    });
    return data?.map(mapProducto);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const putProducto = async (producto: Partial<Producto>, servidor: boolean, usuario: string): Promise<{ ok: boolean } | null> => {
  try {
    const data = await apiRequest(servidor, {
      url: `/productos/${producto.id}`,
      method: 'PUT',
      data: mapProductoBackend(producto),
      timeout: 4000,
      headers: {
        Authorization: `Bearer ${usuario}`,
      },
    });

    if (data.ok) {
      return {
        ok: true,
      };
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
