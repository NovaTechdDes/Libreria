import { InventarioContainer } from '@/src/components/admin/inventario/InventarioContainer';
import { getProductos } from '@/src/helper/getProductos';
import { getRubrosSubRubrosClient } from '@/src/helper/getRubrosSubRubros';
import { getSubRubros } from '@/src/helper/getSubRubros';


interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
    rubro?: string;
    subrubro?: string;
    desactivados?: string;
    activoBackend?: string;
  }>;
}

export default async function InventarioPage({ searchParams }: Props) {
  const { page, search, rubro, subrubro, desactivados } = await searchParams;

  const currentPage = Number(page) || 1;
  const limit = 50;
  const rubroId = rubro ? Number(rubro) : undefined;
  const subRubroId = subrubro ? Number(subrubro) : undefined;
  const mostrarDesactivados = desactivados === 'true';
  

  const { productos, total, totalPages } = await getProductos(
    currentPage,
    search ?? '',
    !mostrarDesactivados,
    subRubroId,
    rubroId,
    desactivados
  );
  const rubros = await getRubrosSubRubrosClient();
  const subRubros = await getSubRubros(rubroId ?? 0);

  return (
    <InventarioContainer
      search={search ?? ''}
      limit={limit}
      rubroSeleccionado={rubroId}
      subRubroSeleccionado={subRubroId}
      mostrarDesactivados={mostrarDesactivados}
      productos={productos || []}
      totalPages={totalPages || 1}
      currentPage={currentPage}
      totalProductos={total || 0}
      rubros={rubros ?? []}
      subRubros={subRubros ?? []}
    />
  );
}
