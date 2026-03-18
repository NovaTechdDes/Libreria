import { getProductos } from "@/actions/productos.actions";
import { useQuery } from "@tanstack/react-query";

export const useProductos = (search?: string) => {
  return useQuery({
    queryKey: ["productos", search],
    queryFn: () => getProductos(search),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
