'use client';

import { Producto } from '@/src/interface/Producto';
import { useCarritoStore } from '@/src/store/carrito.store';
import Image from 'next/image';
import { CgShoppingCart } from 'react-icons/cg';

interface ProductoCardProps {
  producto: Producto;
}

const BtnCarrito = ({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full flex items-center justify-center gap-2 text-[13px] font-semibold py-2.5 rounded-lg transition-all duration-150 ${
      disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none' : 'bg-primary hover:brightness-95 active:scale-[0.97] text-white'
    }`}
  >
    <CgShoppingCart size={18} />
    {disabled ? 'Sin stock' : 'Agregar al carrito'}
  </button>
);

export const ProductoCard = ({ producto }: ProductoCardProps) => {
  const { agregarProducto } = useCarritoStore();

  const isPriceVisible = producto.isvisibleprecio !== false;
  const isStockAvailable = producto.isvisiblestock !== false && (producto.cantidad ?? 0) > 0;

  const addCarrito = () => {
    if (!producto || !isStockAvailable) return;
    agregarProducto(producto, 1);
  };

  return (
    <article className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-180 ease-in-out cursor-pointer">
      {/* Área de imagen con botón overlay — solo en desktop al hacer hover */}
      <div className="relative w-full h-[200px] bg-[#f4f4f2] shrink-0 overflow-hidden">
        {producto.imagen_url ? (
          <Image
            src={producto.imagen_url}
            alt={producto.descripcion}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#b0b0a8]">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span className="text-[11px] font-medium tracking-[0.06em] uppercase">Sin imagen</span>
          </div>
        )}

        {/* Overlay — SOLO visible en desktop al hacer hover */}
        <div className="hidden md:block absolute inset-x-0 bottom-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <div className="absolute inset-x-0 bottom-full h-12 bg-linear-to-t from-black/30 to-transparent pointer-events-none" />
          <div className="bg-white/90 backdrop-blur-sm px-4 py-3">
            <BtnCarrito onClick={addCarrito} disabled={!isStockAvailable} />
          </div>
        </div>
      </div>

      {/* Contenido del card */}
      <div className="flex flex-col gap-1 flex-1 px-4 pt-3.5 pb-4">
        {/* Rubro / categoría */}
        <p className="text-[10px] font-semibold tracking-[0.08em] uppercase text-primary m-0">{producto.id_rubro ? `Rubro ${producto.id_rubro}` : 'Sin categoría'}</p>

        {/* Nombre del producto */}
        <h3 className="text-[15px] font-bold text-[#1a1a18] mt-0.5 leading-[1.3] line-clamp-2">{producto.descripcion}</h3>

        {/* Precio + badge stock */}
        <div className="mt-auto pt-2.5 flex items-center justify-between">
          <span className="text-[15px] font-bold text-[#1a1a18] tabular-nums">
            {isPriceVisible && producto.precio != null ? `$${Number(producto.precio).toLocaleString('es-AR')}` : 'Precio a consultar'}
          </span>

          {/* Stock badge */}
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full tracking-[0.04em] ${
              isStockAvailable ? 'bg-[rgba(107,143,107,0.12)] text-[#4a7c4a]' : 'bg-[rgba(180,60,60,0.10)] text-[#b43c3c]'
            }`}
          >
            {!isStockAvailable && 'Sin stock'}
          </span>
        </div>
      </div>

      {/* Botón — SOLO visible en móvil, siempre abajo del contenido */}
      <div className="md:hidden px-4 pb-4">
        <BtnCarrito onClick={addCarrito} disabled={!isStockAvailable} />
      </div>
    </article>
  );
};
