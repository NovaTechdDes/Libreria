import { Producto } from '@/src/interface/Producto';
import { ProductoCard } from './ProductoCard';
import { createClient } from '@/src/lib/server';
import { CartInitializer } from '../carrito/CartInitializer';
import { BuscadorCarrito } from './BuscadorCarrito';

interface Props {
  search?: string;
  currentPage: number;
  limit: number;
  subRubroActivo?: number;
  rubroActivo?: number;
}

export const Productos = async ({ search, currentPage = 1, limit = 20, subRubroActivo }: Props) => {
  const supabase = await createClient();
  const from = (currentPage - 1) * limit;
  const to = from + (limit - 1);

  const { data: configuracion } = await supabase.from('configuracion').select('*').single();

  let query = supabase.from('productos').select('*, subRubros: fk_producto_subrubro(*), productos_colores (colores(*))').eq('activo', true).range(from, to).order('descripcion', { ascending: false });

  if (search) {
    query = query.ilike('descripcion', `%${search}%`);
  }

  if (subRubroActivo) {
    query = query.eq('id_subrubro', subRubroActivo);
  }

  const { data: productos, error } = await query;

  if (error) {
    console.error('error', error);
    return null;
  }

  if (!productos) return null;

  return (
    <>
      <CartInitializer
        habilitado={configuracion?.carrito_habilitado}
        frase={configuracion?.frase_descuento}
        mensaje={configuracion?.mensaje_informativo}
        descuento={configuracion?.porcentaje_descuento}
      />
      <section className="w-full px-4 sm:px-6 lg:px-8 py-6 max-w-(--breakpoint-2xl) mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h2 className="text-[22px] md:text-2xl font-semibold text-[#1a1a18] mb-6 tracking-tight">Productos</h2>

          <BuscadorCarrito />
        </div>

        {/* mapeo de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5 lg:gap-6">
          {productos?.map((producto: Producto) => (
            <ProductoCard key={producto.id_producto} producto={producto} />
          ))}
        </div>
      </section>
    </>
  );
};
