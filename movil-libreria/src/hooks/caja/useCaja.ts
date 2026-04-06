import { useQuery } from '@tanstack/react-query';
import { getMovCajas } from '../../actions/caja.actions';

export const useCaja = (servidor: boolean) => {
  return useQuery({
    queryKey: ['caja', servidor],
    queryFn: () => getMovCajas(servidor),
  });
};
