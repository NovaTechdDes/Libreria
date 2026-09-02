import { Usuario } from "../interface";
import api from "./api.service";

export const getUsuario = async (clave: string): Promise<{data:Usuario}> => {
    try {
        const {data} = await api.get<{data:Usuario}>(`/usuarios/${clave}`);
        
        return data;
    } catch (error: any) {
        console.error("Error en getUsuario:", error);
        return Promise.reject(
            error.response?.data?.message || error.message || "Error al autenticar"
        );  
    }
};