import { Producto_Visto } from '@/src/interface/Producto_Visto';
import { getProductosMasVistos, postProductosVistos } from '@/src/service/productos_visto.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useProductosMasVistos = (fecha: Date) => {
  return useQuery({
    queryKey: ['productos-vistos', fecha],
    queryFn: () => getProductosMasVistos(fecha),
    enabled: !!fecha,
    staleTime: 1000 * 60 * 5, // 5 Minutos
  });
};

export const useRegistrarProductoVisto = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Producto_Visto) => postProductosVistos(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['productos-vistos']})
        }
    })
}