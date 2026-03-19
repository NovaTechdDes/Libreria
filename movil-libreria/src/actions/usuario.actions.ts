import { Usuario } from "@/interface";
import { mapUsuario } from "@/mappers/usuario.mappers";
import { getUrl } from "@/utils/getURL";
import axios from "axios";

export const getUsuarioByClave = async (clave: string): Promise<Usuario> => {
  try {
    if (!clave) {
      return {
        id_usuario: "0",
        denominacion: "",
        clave: "",
        administrador: 0,
      };
    }
    const URL = `http://${await getUrl()}/usuarios/${clave}`;

    const { data } = await axios.get(URL);

    if (!data) {
      return {
        id_usuario: "0",
        denominacion: "",
        clave: "",
        administrador: 0,
      };
    }

    return mapUsuario(data.data);
  } catch (error) {
    console.log(error);
    return {
      id_usuario: "0",
      denominacion: "",
      clave: "",
      administrador: 0,
    };
  }
};
