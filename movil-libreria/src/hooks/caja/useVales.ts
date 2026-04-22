import { getVales } from '@/actions/caja.actions';
import { useQuery } from '@tanstack/react-query';

export const useVales = (servidor: boolean, usuario: string) => {
  return useQuery({
    queryKey: ['vales', servidor, usuario],
    queryFn: () => getVales(servidor, usuario),
  });
};
