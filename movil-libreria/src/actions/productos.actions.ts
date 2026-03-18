import { Producto } from "@/interface";
import { mapProducto, mapProductoBackend } from "@/mappers/producto.mappers";
import { getUrl } from "@/utils/getURL";
import axios from "axios";

export const getProductos = async (search?: string): Promise<Producto[]> => {
  const URL = `http://${await getUrl()}/productos/`;

  try {
    const { data } = await axios.get(`${URL}`, {
      params: {
        search: search || undefined,
        limit: 100,
      },
    });

    return data.data.map(mapProducto);
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const putProducto = async (
  producto: Partial<Producto>,
): Promise<boolean> => {
  const URL = `http://${await getUrl()}/productos/`;
  try {
    const { data } = await axios.put(
      `${URL}${producto.id}`,
      mapProductoBackend(producto),
    );

    return data.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
