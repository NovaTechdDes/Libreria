import { createClient } from "../lib/server";

const PAGE_SIZE = 9;

export async function getColores(page: number, search: string) {
    const supabase = await createClient();
    const from = (page - 1 ) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let query =  supabase
    .from('colores').
    select('*')
    .range(from, to)
    .order('id', { ascending: false });

    if(search){
        query = query.ilike('color', `%${search}%`);
    }

    const { data, error } = await query;

    if(error) throw error;

    return {
        colores: data,
        total: data?.length || 0,
        totalPages: Math.ceil(data?.length || 0)
    }
}