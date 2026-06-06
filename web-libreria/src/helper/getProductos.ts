import { createClient } from "@/src/lib/server";

const PAGE_SIZE = 50;

export async function getProductos(page: number, search: string, activo: boolean = true, subRubroActivo?: number){
    const supabase = await createClient();
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let query = supabase.from('productos').select('*, subRubros: fk_producto_subrubro(*), productos_colores (colores(*)), variantes:productos_variantes(*)', {count: 'exact'}).range(from, to).order('descripcion', {ascending: true});

    if(search){
        query = query.or(`descripcion.ilike.%${search}%,codigo.ilike.%${search}%`);
    }

    if(subRubroActivo){
        query = query.eq('id_subrubro', subRubroActivo);
    }

    if(activo){
        query = query.eq('activo', activo)
    }

    const { data, count, error } = await query

    if(error) throw error;

    return {
        productos: data,
        total: count ?? 0,
        totalPages: Math.ceil((count ?? 0) / PAGE_SIZE)
    }
}