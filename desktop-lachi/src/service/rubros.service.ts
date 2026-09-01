import { Rubro, SubRubro } from "../interface";
import api from "./api.service";

export const getRubros = async (): Promise<{rubro: Rubro[]; subRubros: SubRubro[]}> => {
    try {
        const {data} = await api.get(`/rubro`);

        if(data.ok){
            return {
                rubro: data.data,
                subRubros: data.subrubros
            }
        }

        return {
            rubro: [],
            subRubros: []
        }
        
        
    } catch (error: any) {
        console.error("Error en getRubros:", error);
        return Promise.reject(
            error.response?.data?.message || error.message || "Error al obtener los rubros"
        );
    }
};