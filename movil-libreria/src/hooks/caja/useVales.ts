import { getVales } from '@/actions/caja.actions';
import { useQuery } from '@tanstack/react-query';

export const useVales = () => {
  return useQuery({
    queryKey: ['vales'],
    queryFn: () => getVales(),
  });
};
