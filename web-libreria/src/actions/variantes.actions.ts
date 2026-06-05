'use server'

import { revalidatePath } from "next/cache";
import { createClient } from "../lib/server";

export const postVariante = async(variante: string, productoId: number): Promise<boolean> => {
    try {

        const supabase = await createClient();
        const { error } = await supabase.from('productos_variantes').insert({
            id_producto: productoId,
            nombre: variante
        })

        if(error) throw error;

        const { error:errorUpdate } = await supabase.from('productos').update({
            tiene_variantes: true
        }).eq('id_producto', productoId);

        if(errorUpdate) throw errorUpdate;

        revalidatePath(`/admin/inventario`)
        return true;
        
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const deleteVariante = async(idVariante: number): Promise<boolean> => {
    try {
        const supabase = await createClient();
        const { error } = await supabase.from('productos_variantes').delete().eq('id', idVariante);

        if(error) throw error;

        
        revalidatePath(`/admin/inventario`)

        return true;
    } catch (error) {
        console.error(error);
        return false
    }
}