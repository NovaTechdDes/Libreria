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
  const limit = 50;

  const { productos, total,  totalPages } = await getProductos(currentPage, search ?? '', false);

  return <InventarioContainer limit={limit} productos={productos || []} totalPages={totalPages} currentPage={currentPage} totalProductos={total || 0} />;
}
