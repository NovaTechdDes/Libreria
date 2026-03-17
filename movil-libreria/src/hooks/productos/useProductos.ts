import { getProductos } from "@/actions/productos.actions";
import { useQuery } from "@tanstack/react-query";

export const useProductos = () => {
  return useQuery({
    queryKey: ["productos"],
    queryFn: () => getProductos(),
  });
};
