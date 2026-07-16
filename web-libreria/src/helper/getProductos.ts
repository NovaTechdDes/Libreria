
import { api } from "../service";

const PAGE_SIZE = 50;

export async function getProductos(page: number, search: string, activo: boolean = true, subRubroActivo?: number, rubro?: number){

    
    
    const { data } = await api.get('/api/productos', {
        params: {
            page,
            search,
            activo,
            subRubroActivo,
            subrubro: subRubroActivo,
            rubro
        }
    });


    if(!data.ok) throw new Error(data.msg);

    return {
        productos: data.data,
        total: data.total,
        totalPages: Math.ceil(data.total / PAGE_SIZE)
    }
}

