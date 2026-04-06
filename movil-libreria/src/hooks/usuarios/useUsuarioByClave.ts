import { getUsuarioByClave } from '@/actions';
import { useQuery } from '@tanstack/react-query';

export const useUsuarioByClave = (clave: string, servidor: boolean) => {
  return useQuery({
    queryKey: ['usuario', clave, servidor],
    queryFn: () => getUsuarioByClave(clave, servidor),
  });
};
