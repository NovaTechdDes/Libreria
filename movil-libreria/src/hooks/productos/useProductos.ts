import { getProductos } from '@/actions/productos.actions';
import { useQuery } from '@tanstack/react-query';

export const useProductos = (search: string, servidor: boolean, id_rubro: number | null) => {
  return useQuery({
    queryKey: ['productos', search, servidor, id_rubro],
    queryFn: () => getProductos(search, servidor, id_rubro),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
