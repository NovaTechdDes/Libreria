import { updatePrecioVisibleProducto, updateProducto, updateStockVisibleProducto, updateVisibilidadProducto } from '@/src/actions/producto.actions';
import { ImageItem } from '@/src/components/admin/inventario/FormularioProducto';
import { Color } from '@/src/interface/Color';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useMutateProductos = () => {
  const queryClient = useQueryClient();

  const startUpdateVisible = useMutation({
    mutationFn: async ({ activo, id }: { activo: boolean; id: number }) => {
      return await updateVisibilidadProducto(activo, id);
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['productos'] });
      }
    },
  });

  const startUpdatePrecioVisible = useMutation({
    mutationFn: async ({ activo, id }: { activo: boolean; id: number }) => {
      return await updatePrecioVisibleProducto(activo, id);
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['productos'] });
      }
    },
  });

  const startUpdateStockVisile = useMutation({
    mutationFn: async ({ activo, id }: { activo: boolean; id: number }) => {
      return await updateStockVisibleProducto(activo, id);
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['productos'] });
      }
    },
  });

  const startUpdateProducto = useMutation({
    mutationFn: async ({ colores, imagenes, id }: { colores: Color[]; imagenes: ImageItem[]; id: number }) => {
      return await updateProducto(colores, imagenes, id);
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['productos'] });
      }
    },
  });

  return {
    startUpdateVisible,
    startUpdatePrecioVisible,
    startUpdateStockVisile,
    startUpdateProducto,
  };
};
