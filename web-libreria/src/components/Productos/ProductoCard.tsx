'use client';

import { Producto } from '@/src/interface/Producto';
import { carritoHabilitado } from '@/src/helper/carritoHabilitado';
import { useCarritoStore } from '@/src/store/carrito.store';
import Image from 'next/image';
import { CgShoppingCart } from 'react-icons/cg';
import { ButtonSeleccionarColor } from './ButtonSeleccionarColor';
import { useState } from 'react';

interface ProductoCardProps {
  producto: Producto;
}

export const ProductoCard = ({ producto }: ProductoCardProps) => {
  const { agregarProducto, habilitado, inicio, fin } = useCarritoStore();
  const [colorSeleccionado, setColorSeleccionado] = useState<number>(producto.productos_colores?.[0].colores?.id ?? 0);

  const isPriceVisible = producto.isvisibleprecio !== false;
  const isStockAvailable = producto.isstock !== false && (producto.cantidad ?? 0) > 0;

  const addCarrito = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!producto || !isStockAvailable) return;
    const color = producto.productos_colores?.find((color) => color.colores?.id === colorSeleccionado);
    agregarProducto(producto, 1, color?.colores ?? null);
  };

  if (!producto.id_producto) return null;

  return (
    <article className="group flex flex-row sm:flex-col bg-white dark:bg-white/5 rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] dark:hover:bg-white/8 transition-all duration-300 ease-out cursor-pointer border border-gray-100/50 dark:border-white/10 h-full min-h-[140px] sm:min-h-0">
      {/* Área de imagen */}
      <div className="relative w-36 h-36 sm:w-full sm:h-auto sm:aspect-4/5 bg-[#F9F9F7] dark:bg-black/20 overflow-hidden shrink-0">
        {producto.imagenes && JSON.parse(producto.imagenes)[0] ? (
          <Image
            src={JSON.parse(producto.imagenes)[0]}
            alt={producto.descripcion}
            fill
            sizes="(max-width: 640px) 150px, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-300">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span className="text-[8px] font-medium uppercase tracking-wider">Sin imagen</span>
          </div>
        )}

        {/* Stock Badge - Top Right */}
        {!isStockAvailable && (
          <div className="absolute top-1.5 right-1.5 z-10">
            <span className="bg-white/90 dark:bg-black/60 backdrop-blur-md text-red-600 dark:text-red-400 text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-tighter shadow-sm border border-red-50 dark:border-red-900/30">
              Agotado
            </span>
          </div>
        )}

        {/* Category Badge - Top Left */}
        {producto.subRubros && (
          <div className="absolute top-1.5 left-1.5 z-10">
            <span className="bg-primary/90 dark:bg-primary/80 backdrop-blur-md text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-tighter shadow-sm">
              {producto.subRubros.nombre}
            </span>
          </div>
        )}

        {/* Desktop Overlay Cart Button */}
        <div className="hidden md:flex absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center">
          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 w-full px-4 absolute bottom-4">
            {carritoHabilitado(inicio, fin, habilitado) && (
              <button
                onClick={addCarrito}
                disabled={!isStockAvailable}
                className="w-full bg-white/95 dark:bg-primary backdrop-blur-md text-primary dark:text-white font-bold py-2.5 rounded-xl shadow-lg hover:bg-white dark:hover:bg-primary/90 transition-all flex items-center justify-center gap-2 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CgShoppingCart size={18} />
                Agregar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Contenido del card */}
      <div className="flex flex-col flex-1 p-3 sm:p-4 gap-1.5 sm:gap-2">
        {/* Nombre y Colores */}
        <div className="space-y-1 sm:space-y-1.5">
          <h3 className="text-[13px] sm:text-[15px] font-semibold text-gray-800 dark:text-white leading-tight line-clamp-2 min-h-0 sm:min-h-[40px]">{producto.descripcion}</h3>

          <div className="flex flex-wrap gap-3 sm:gap-3 items-center">
            {producto.productos_colores?.map((color, index) => (
              <ButtonSeleccionarColor
                key={color.colores?.id ?? index}
                color={color}
                producto_id={producto.id_producto}
                colorSeleccionado={colorSeleccionado}
                setColorSeleccionado={setColorSeleccionado}
              />
            ))}
          </div>
        </div>

        {/* Precio y CTA Móvil */}
        <div className="mt-auto pt-1 sm:pt-2 flex flex-col gap-2 sm:gap-3">
          <div className="flex items-baseline gap-1">
            <span className="text-[15px] sm:text-lg font-bold text-gray-900 dark:text-white">
              {isPriceVisible && producto.precio != null ? `$${Number(producto.precio).toLocaleString('es-AR')}` : 'Consultar'}
            </span>
            {isPriceVisible && producto.precio != null && <span className="text-[9px] sm:text-[10px] text-gray-400 dark:text-slate-400 font-medium">c/u</span>}
          </div>

          {/* Botón Móvil */}
          <div className="">
            {carritoHabilitado(inicio, fin, habilitado) && (
              <button
                onClick={addCarrito}
                disabled={!isStockAvailable}
                className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-bold transition-all ${
                  isStockAvailable ? 'bg-primary text-white shadow-sm active:scale-95' : 'bg-gray-100 dark:bg-white/10 text-gray-400 dark:text-slate-500 cursor-not-allowed'
                }`}
              >
                <CgShoppingCart size={14} />
                {isStockAvailable ? 'Agregar' : 'Sin stock'}
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
