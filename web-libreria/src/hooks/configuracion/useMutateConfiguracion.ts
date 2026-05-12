import { putBannerConfig, putDescuentoConfig } from '@/src/actions/configuracion.actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useMutateConfiguracion = () => {
  const queryClient = useQueryClient();

  const startPutDescuento = useMutation({
    mutationFn: async ({ porcentaje, frase }: { porcentaje: number; frase: string }) => {
      return await putDescuentoConfig(porcentaje, frase);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['configuracion'] });
    },
  });

  const startPutBannerConfig = useMutation({
    mutationFn: async ({ mensaje, habilitado }: { mensaje: string; habilitado: boolean }) => {
      return await putBannerConfig(mensaje, habilitado);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['configuracion'] });
    },
  });

  return {
    startPutDescuento,
    startPutBannerConfig
  };
};
