import { InventarioContainer } from '@/src/components/admin/inventario/InventarioContainer';
import { createClient } from '@/src/lib/server';

interface Props {
  searchParams: {
    page: string;
    search: string;
  };
}

export default async function InventarioPage({ searchParams }: Props) {
  const { page, search } = await searchParams;
  const supabase = await createClient();

  const currentPage = Number(page) || 1;
  const limit = 20;

  let query = supabase
    .from('productos')
    .select('*, productos_colores (colores(*))')
    .range((currentPage - 1) * limit, currentPage * limit);

  if (search) {
    query = query.ilike('descripcion', `%${search}%`);
  }

  query = query.order('descripcion', { ascending: true });

  const { data } = await query;

  return <InventarioContainer productos={data || []} totalPages={0} currentPage={currentPage} totalProductos={0} />;
}
