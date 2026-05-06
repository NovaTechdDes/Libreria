import { getProductos } from '@/actions/productos.actions';
import { useQuery } from '@tanstack/react-query';

export const useProductos = (search: string, servidor: boolean, id_rubro: number | null, id_subrubro: number | null) => {
  return useQuery({
    queryKey: ['productos', search, servidor, id_rubro, id_subrubro],
    queryFn: () => getProductos(search, servidor, id_rubro, id_subrubro),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
