'use server'

import { revalidatePath } from "next/cache"
import { api } from "../service";

export const postVariante = async(variante: string, productoId: number): Promise<boolean> => {
    try {

        await api.post('api/varianteProducto', {
            id_producto: productoId,
            nombre: variante
        });


        revalidatePath(`/admin/inventario`);
        return true;
        
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const deleteVariante = async(idVariante: number): Promise<boolean> => {
    try {
        const { data } = await api.delete(`api/varianteProducto/${idVariante}`);
        if(!data.ok) throw new Error(data.msg);

        revalidatePath(`/admin/inventario`)

        return true;
    } catch (error) {
        console.error(error);
        return false
    }
}