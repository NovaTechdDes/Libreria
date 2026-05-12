'use client';

import { Producto } from '@/src/interface/Producto';
import { useCarritoStore } from '@/src/store/carrito.store';
import Image from 'next/image';
import { CgShoppingCart } from 'react-icons/cg';
import { ButtonSeleccionarColor } from './ButtonSeleccionarColor';
import { useState } from 'react';

interface ProductoCardProps {
  producto: Producto;
}

export const ProductoCard = ({ producto }: ProductoCardProps) => {
  const { agregarProducto, habilitado } = useCarritoStore();
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
    <article className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out cursor-pointer border border-gray-100/50 h-full">
      {/* Área de imagen */}
      <div className="relative aspect-square sm:aspect-4/5 bg-[#F9F9F7] overflow-hidden">
        {producto.imagenes && JSON.parse(producto.imagenes)[0] ? (
          <Image
            src={JSON.parse(producto.imagenes)[0]}
            alt={producto.descripcion}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-300">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span className="text-[10px] font-medium uppercase tracking-wider">Sin imagen</span>
          </div>
        )}

        {/* Stock Badge - Top Right */}
        {!isStockAvailable && (
          <div className="absolute top-2 right-2 z-10">
            <span className="bg-white/90 backdrop-blur-md text-red-600 text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter shadow-sm border border-red-50">Agotado</span>
          </div>
        )}

        {/* Category Badge - Top Left */}
        {producto.subRubros && (
          <div className="absolute top-2 left-2 z-10">
            <span className="bg-primary/90 backdrop-blur-md text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter shadow-sm">{producto.subRubros.nombre}</span>
          </div>
        )}

        {/* Desktop Overlay Cart Button */}
        <div className="hidden md:flex absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center">
          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 w-full px-4 absolute bottom-4">
            {habilitado && (
              <button
                onClick={addCarrito}
                disabled={!isStockAvailable}
                className="w-full bg-white/95 backdrop-blur-md text-primary font-bold py-2.5 rounded-xl shadow-lg hover:bg-white transition-all flex items-center justify-center gap-2 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CgShoppingCart size={18} />
                Agregar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Contenido del card */}
      <div className="flex flex-col flex-1 p-3 md:p-4 gap-2">
        {/* Nombre y Colores */}
        <div className="space-y-1.5">
          <h3 className="text-sm md:text-[15px] font-semibold text-gray-800 leading-tight line-clamp-2 min-h-10">{producto.descripcion}</h3>

          <div className="flex flex-wrap gap-1.5 items-center">
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
        <div className="mt-auto pt-2 flex flex-col gap-3">
          <div className="flex items-baseline gap-1">
            <span className="text-base md:text-lg font-bold text-gray-900">{isPriceVisible && producto.precio != null ? `$${Number(producto.precio).toLocaleString('es-AR')}` : 'Consultar'}</span>
            {isPriceVisible && producto.precio != null && <span className="text-[10px] text-gray-400 font-medium">c/u</span>}
          </div>

          {/* Botón Móvil */}
          <div className="md:hidden">
            {habilitado && (
              <button
                onClick={addCarrito}
                disabled={!isStockAvailable}
                className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
                  isStockAvailable ? 'bg-primary text-white shadow-sm active:scale-95' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <CgShoppingCart size={16} />
                {isStockAvailable ? 'Agregar' : 'Sin stock'}
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
