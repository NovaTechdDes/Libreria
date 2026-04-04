import { startCierreCaja } from '@/actions/caja.actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useMutateCaja = () => {
  const queryClient = useQueryClient();

  const postCierreCaja = useMutation({
    mutationFn: () => startCierreCaja(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['caja'] });
      queryClient.invalidateQueries({ queryKey: ['vales'] });
    },
  });

  return {
    postCierreCaja,
  };
};
