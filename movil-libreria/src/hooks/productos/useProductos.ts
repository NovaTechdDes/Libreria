import { getProductos } from '@/actions/productos.actions';
import { useQuery } from '@tanstack/react-query';

export const useProductos = (search: string, servidor: boolean) => {
  return useQuery({
    queryKey: ['productos', search, servidor],
    queryFn: () => getProductos(search, servidor),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
