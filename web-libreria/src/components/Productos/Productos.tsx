import { Producto } from "@/src/interface/Producto";
import { ProductoCard } from "./ProductoCard";

async function getProductos(): Promise<Producto[] | null> {
  const url = process.env.NEXT_PUBLIC_URL_API;
  const res = await fetch(`${url}productos`, {
    cache: "no-store",
  });

  const data = await res.json();

  if (data.data.length > 0) {
    return data.data;
  } else {
    return null;
  }
}

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
          <ProductoCard key={producto.id_articulo} producto={producto} />
        ))}
      </div>
    </section>
  );
};
