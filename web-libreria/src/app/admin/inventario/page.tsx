import { InventarioContainer } from '@/src/components/admin/inventario/InventarioContainer';
import { getProductos } from '@/src/helper/getProductos';

interface Props {
  searchParams: {
    page: string;
    search: string;
  };
}

export default async function InventarioPage({ searchParams }: Props) {
  const { page, search } = await searchParams;

  const currentPage = Number(page) || 1;
  const limit = 20;

  const result = await getProductos(currentPage, limit, search, false);

  return <InventarioContainer productos={result?.data || []} totalPages={result?.totalPages || 0} currentPage={currentPage} totalProductos={result?.totalProductos || 0} />;
}
