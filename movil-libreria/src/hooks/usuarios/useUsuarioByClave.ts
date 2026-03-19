import { getUsuarioByClave } from "@/actions";
import { useQuery } from "@tanstack/react-query";

export const useUsuarioByClave = (clave: string) => {
  return useQuery({
    queryKey: ["usuario", clave],
    queryFn: () => getUsuarioByClave(clave),
  });
};
