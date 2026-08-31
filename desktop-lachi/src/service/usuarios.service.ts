import { Usuario } from "../interface";
import api from "./api.service";

export const getUsuario = async (nombre: string, clave: string): Promise<Usuario> => {
    try {
        const response = await api.get<Usuario>(`/usuarios/${clave}`);

        console.log(response)
        return response.data;
    } catch (error: any) {
        console.error("Error en getUsuario:", error);
        return Promise.reject(
            error.response?.data?.message || error.message || "Error al autenticar"
        );
    }
};