import { getProductos } from '@/actions/productos.actions';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useDebounce } from '../useDebounce';
const PAGE_SIZE = 50;
export const useProductos = (search: string, servidor: boolean, id_rubro: number | null, id_subrubro: number | null) => {
  const textoDebounce = useDebounce(search, 350);
  return useInfiniteQuery({
    queryKey: ['productos', textoDebounce, servidor, id_rubro, id_subrubro],

    queryFn: ({ pageParam = 1 }) => getProductos(textoDebounce, servidor, id_rubro, id_subrubro, pageParam * PAGE_SIZE),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < allPages.length * PAGE_SIZE) {
        return undefined;
      }
      return allPages.length + 1;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
