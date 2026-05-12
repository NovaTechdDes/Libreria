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
    .select('*, productos_colores (colores(*))', { count: 'exact' })
    .range((currentPage - 1) * limit, currentPage * limit - 1);

  if (search) {
    query = query.ilike('descripcion', `%${search}%`);
  }

  query = query.order('descripcion', { ascending: true });

  const { data, count } = await query;

  const totalPages = Math.ceil((count || 0) / limit);

  return <InventarioContainer productos={data || []} totalPages={totalPages} currentPage={currentPage} totalProductos={count || 0} />;
}
