import { InventarioContainer } from "@/src/components/admin/inventario/InventarioContainer";
import { getProductos } from "@/src/helper/getProductos";

export default async function InventarioPage() {
  const productos = await getProductos();

  return <InventarioContainer productos={productos || []} />;
}
