import { getVales } from '@/actions/caja.actions';
import { useQuery } from '@tanstack/react-query';

export const useVales = (servidor: boolean) => {
  return useQuery({
    queryKey: ['vales', servidor],
    queryFn: () => getVales(servidor),
  });
};
