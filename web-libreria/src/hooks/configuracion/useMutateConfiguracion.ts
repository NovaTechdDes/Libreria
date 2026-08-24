import { putBannerConfig, putDescuentoConfig, putMostrarPreciosConfig } from '@/src/actions/configuracion.actions';
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
    mutationFn: async ({ mensaje, fecha_inicio, fecha_fin, habilitado }: { mensaje: string; fecha_inicio: string; fecha_fin: string; habilitado: boolean }) => {
      return await putBannerConfig(mensaje, fecha_inicio, fecha_fin, habilitado);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['configuracion'] });
    },
  });

  const startPutMostrarPreciosConfig = useMutation({
    mutationFn: async (mostrar_precios: boolean) => {
      return await putMostrarPreciosConfig(mostrar_precios);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['configuracion'] });
    },
  });

  return {
    startPutDescuento,
    startPutBannerConfig,
    startPutMostrarPreciosConfig
  };
};


