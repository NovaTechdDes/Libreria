'use server'
import { SubRubro } from "../interface/SubRubro";
import { api } from "../service";

export const getSubRubros = async(rubroActivo: number) => {
    
    const { data } = await api.get(`api/subrubros/rubro/${rubroActivo}`);

    if(!data.ok){
        console.error(data.msg);
        return null;
    };

    const subRubros = [{ id_subrubro: '', nombre: 'TODOS', id_rubro: '' }, ...data.subrubros] as SubRubro[];

    return subRubros;
}