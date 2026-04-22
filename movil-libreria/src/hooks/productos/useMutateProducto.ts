import { putProducto } from '@/actions/productos.actions';
import { Producto } from '@/interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useMutateProducto = () => {
  const queryClient = useQueryClient();

  const modificarProducto = useMutation({
    mutationFn: ({ producto, servidor, usuario }: { producto: Partial<Producto>; servidor: boolean; usuario: string }) => putProducto(producto, servidor, usuario),
    onSuccess: (nuevoProducto) => {
      if (nuevoProducto) {
        queryClient.setQueriesData({ queryKey: ['productos'] }, (oldData: Producto[] | undefined) => {
          if (!oldData) return oldData;
          return oldData.map((p) => (p.id === nuevoProducto.id ? nuevoProducto : p));
        });
      }
      queryClient.invalidateQueries({ queryKey: ['productos'] });
    },
  });

  return {
    modificarProducto,
  };
};
