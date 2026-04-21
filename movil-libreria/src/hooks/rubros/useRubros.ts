import { getRubros } from '@/actions/rubro.actions';
import { useQuery } from '@tanstack/react-query';

export const useRubros = (servidor: boolean) => {
  return useQuery({
    queryKey: ['rubros', servidor],
    queryFn: () => getRubros(servidor),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
