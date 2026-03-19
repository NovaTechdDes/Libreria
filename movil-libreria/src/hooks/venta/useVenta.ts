import { getVentaForDay } from "@/actions";
import { useQuery } from "@tanstack/react-query";

export const useVenta = () => {
  return useQuery({
    queryKey: ["venta"],
    queryFn: () => getVentaForDay(),
    staleTime: 1000 * 60 * 5,
  });
};
