import { Producto } from "@/src/interface/Producto";
import { ProductoCard } from "./ProductoCard";
import { getProductos } from "@/src/helper/getProductos";


export const Productos = async () => {
  const productos = await getProductos();


  if (!productos) return null;

  return (
    <section className="w-full px-8 py-6">
      <h2 className="text-[22px] font-bold text-[#1a1a18] mb-5 tracking-tight">
        Productos
      </h2>

      {/* mapeo de productos */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
        {productos?.map((producto: Producto) => (
          <ProductoCard key={producto.id} producto={producto} />
        ))}
      </div>
    </section>
  );
};
