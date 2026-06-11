import { Producto } from '@/src/interface/Producto';
import { ProductoCard } from './ProductoCard';
import { createClient } from '@/src/lib/server';
import { CartInitializer } from '../carrito/CartInitializer';
import { BuscadorCarrito } from './BuscadorCarrito';
import { Pagination } from './Pagination';
import { getProductos } from '@/src/helper/getProductos';

interface Props {
  search?: string;
  currentPage: number;
  subRubroActivo?: number;
  rubroActivo?: number;
}

export const Productos = async ({ search, currentPage = 1, subRubroActivo, rubroActivo }: Props) => {
  const supabase = await createClient();

  const { data: configuracion } = await supabase.from('configuracion').select('*').single();

const { productos,  totalPages } = await getProductos(currentPage, search ?? '', true ,subRubroActivo ?? 0, rubroActivo ?? 0);

  return (
    <>
      <CartInitializer
        inicio={configuracion?.fecha_inicio}
        fin={configuracion?.fecha_fin}
        habilitado={configuracion?.carrito_habilitado}
        frase={configuracion?.frase_descuento}
        mensaje={configuracion?.mensaje_informativo}
        descuento={configuracion?.porcentaje_descuento}
      />
      <section className="w-full px-2 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-[98%] sm:max-w-[90%] mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 mb-4 sm:mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-[#1a1a18] dark:text-white tracking-tight">Productos</h2>

          <BuscadorCarrito />
        </div>

        {/* mapeo de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5 lg:gap-6">
          {productos?.map((producto: Producto) => (
            <ProductoCard key={producto.id_producto} producto={producto} />
          ))}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </section>
    </>
  );
};
