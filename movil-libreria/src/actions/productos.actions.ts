import { Producto } from "@/interface";
import axios from "axios";

const URL = "http://192.168.0.139:3001/productos/";

export const getProductos = async (): Promise<Producto[]> => {
  try {
    const { data } = await axios.get(`${URL}`);
    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const putProducto = async (
  producto: Partial<Producto>,
): Promise<boolean> => {
  try {
    const { data } = await axios.put(`${URL}${producto.id}`, producto);

    return data.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
