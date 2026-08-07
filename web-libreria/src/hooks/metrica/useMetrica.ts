import { useQuery } from "@tanstack/react-query";
import { DateRange } from "../../helper/date-range";
import axios from "axios";


export const useMetrica = (range: DateRange) => {

  return useQuery({
    queryKey: ['metricas', range],
    queryFn: async () => {
      const { data } = await axios.get('/api/analytics', {
        params: { range },
      });

      return data;
    },
  });
};