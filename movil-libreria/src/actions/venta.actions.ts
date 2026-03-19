import { Venta } from "@/interface";
import { mapVenta } from "@/mappers/venta.mapper";
import { getUrl } from "@/utils/getURL";
import axios from "axios";

export const getVentaForDay = async (): Promise<Venta[]> => {
  try {
    const url = `http://${await getUrl()}/ventas`;

    const { data } = await axios.get(url);
    return data.data.map(mapVenta);
  } catch (error) {
    console.log(error);
    return [];
  }
};
