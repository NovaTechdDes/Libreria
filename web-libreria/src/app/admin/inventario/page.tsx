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

  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .range((currentPage - 1) * limit, currentPage * limit);

  return <InventarioContainer productos={data || []} totalPages={0} currentPage={currentPage} totalProductos={0} />;
}
