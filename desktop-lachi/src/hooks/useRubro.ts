import { useQuery } from "@tanstack/react-query";
import { getRubros } from "../service/rubros.service";

export const useRubros = () => {
  return useQuery({
    queryKey: ["rubros"],
    queryFn: getRubros,
    retry: 1,
  });
};