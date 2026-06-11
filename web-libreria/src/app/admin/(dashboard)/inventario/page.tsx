import { InventarioContainer } from '@/src/components/admin/inventario/InventarioContainer';
import { getProductos } from '@/src/helper/getProductos';
import { getRubrosSubRubrosClient } from '@/src/helper/getRubrosSubRubros';
import { getSubRubros } from '@/src/helper/getSubRubros';


interface Props {
  searchParams: {
    page: string;
    search: string;
    rubro: number;
    subrubro: number;
  };
}

export default async function InventarioPage({ searchParams }: Props) {
  const { page, search, rubro, subrubro } = await searchParams;

  const currentPage = Number(page) || 1;
  const limit = 50;

  const { productos, total,  totalPages } = await getProductos(currentPage, search ?? '', false, subrubro, rubro);
  const rubros = await getRubrosSubRubrosClient()
  const subRubros = await getSubRubros(Number(rubro))

  return <InventarioContainer limit={limit} rubroSeleccionado={rubro} subRubroSeleccionado={subrubro} productos={productos || []} totalPages={totalPages} currentPage={currentPage} totalProductos={total || 0} rubros={rubros ?? []} subRubros={subRubros ?? []} />;
}
