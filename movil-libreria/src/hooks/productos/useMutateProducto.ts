import { putProducto } from "@/actions/productos.actions";
import { Producto } from "@/interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMutateProducto = () => {
  const queryClient = useQueryClient();

  const modificarProducto = useMutation({
    mutationFn: (producto: Partial<Producto>) => putProducto(producto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productos"] });
    },
  });

  return {
    modificarProducto,
  };
};
