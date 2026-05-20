'use server';
import { createClient } from '../lib/server';

export async function getRubrosSubRubrosClient() {
  const supabase = await createClient();

  const { data, error } = await supabase.from('rubros').select('*');

  if (error) {
    console.error(error);
    return null;
  }

  const rubros = [{ id: 0, nombre: 'TODOS' }, ...data];

  return rubros;
}
