'use server'
import { SubRubro } from "../interface/SubRubro";
import { createClient } from "../lib/server"

export const getSubRubros = async(rubroActivo: number) => {
    const supabase = await createClient();

    const { data, error } = await supabase
    .from('subrubros')
    .select('*')
    .eq('id_rubro', rubroActivo).order('nombre');

    if(error){
        console.error(error);
        return null;
    };

    const subRubros = [{ id_subrubro: 0, nombre: 'TODOS', id_rubro: 0 }, ...data] as SubRubro[];

    return subRubros;
}