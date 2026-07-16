import { Color } from "../interface/Color";
import api from "./api.service";

const PAGE_SIZE = 9;

interface returnProps {
    colores: Color[],
    total: number,
    totalPages: number
}

const getColores = async(page: number, search: string): Promise<returnProps> => {

    const from = (page - 1 ) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;


    const { data } = await api.get('api/colores', {
        params: {
            from,
            to,
            search
        }
    });


    if(!data.ok) {
        console.error(data.msg);
        return {
            colores: [],
            total: 0,
            totalPages: 0
        };
    };

    return {
        colores: data.colores,
        total: data.count || 0,
        totalPages: Math.ceil((data.count ?? 0) / PAGE_SIZE),
    }
}


const getAllColores = async(): Promise<Color[]> => {
    try {
        const { data } = await api.get('api/colores');
        if(!data.ok){
            
            return [];
        }
        return data.colores;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export  {
    getColores,
    getAllColores
}