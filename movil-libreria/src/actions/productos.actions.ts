import { Producto } from "@/interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const getUrl = async () => {
  const url = await AsyncStorage.getItem("url");
  return url;
};

export const getProductos = async (): Promise<Producto[]> => {
  const URL = `http://${await getUrl()}/productos/`;

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
  const URL = `http://${await getUrl()}/productos/`;
  try {
    const { data } = await axios.put(`${URL}${producto.id}`, producto);

    return data.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
