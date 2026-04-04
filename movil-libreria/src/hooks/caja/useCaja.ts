import { useQuery } from '@tanstack/react-query';
import { getMovCajas } from '../../actions/caja.actions';

export const useCaja = () => {
  return useQuery({
    queryKey: ['caja'],
    queryFn: () => getMovCajas(),
  });
};
