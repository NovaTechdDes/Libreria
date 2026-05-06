import { getRubros } from '@/actions/rubro.actions';
import { Rubro, SubRubro } from '@/interface';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useRubros = (servidor: boolean): UseQueryResult<{ rubros: Rubro[]; subRubros: SubRubro[] }, Error> => {
  return useQuery({
    queryKey: ['rubros', servidor],
    queryFn: () => getRubros(servidor),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    select: (data) => ({
      rubros: data.rubros,
      subRubros: data.subRubros,
    }),
  });
};
