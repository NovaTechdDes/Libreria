'use server'
import { SubRubro } from "../interface/SubRubro";
import { api } from "../service";

export const getSubRubros = async(rubroActivo: number) => {
    
    const { data } = await api.get(`api/subrubros/rubro/${rubroActivo}`);

    if(!data.ok){
        console.error(data.msg);
        return null;
    };

    const subRubros = [{ id_subrubro: 0, nombre: 'TODOS', id_rubro: 0 }, ...data.subrubros] as SubRubro[];

    return subRubros;
}