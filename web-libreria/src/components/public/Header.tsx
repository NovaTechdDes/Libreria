'use client';

import { useState, useEffect } from 'react';
import { carritoHabilitado } from '@/src/helper/carritoHabilitado';
import { useCarritoStore } from '@/src/store/carrito.store';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { FaShoppingCart } from 'react-icons/fa';
import { IoMoon, IoSunny } from 'react-icons/io5';
import { LuShoppingCart, LuMapPin, LuClock } from 'react-icons/lu';
import { useTheme } from '@/src/providers/ThemeProvider';

interface Props {
  habilitado: boolean;
}

export const Header = ({ habilitado }: Props) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [showHoursMobile, setShowHoursMobile] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { productos, inicio, fin } = useCarritoStore();

  const linkClass = (path: string) =>
    pathname === path
      ? 'text-primary font-semibold relative after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full'
      : 'text-gray-600 dark:text-gray-300 hover:text-primary transition-colors';

  useEffect(() => {
    setMounted(true);
  }, []);

  const isCartEnabled = carritoHabilitado(inicio, fin, habilitado);

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-gray-100 dark:border-white/10 text-gray-800 dark:text-gray-100 transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center gap-4">
        {/* Brand & Address */}
        <Link href={'/'} className="flex items-center gap-3 group cursor-pointer min-w-0">
          <div className="relative shrink-0 overflow-hidden rounded-full shadow-sm ring-2 ring-primary/20 group-hover:ring-primary transition-all">
            <Image
              src="/Icon.png"
              alt="Logo Librería Lachi"
              width={44}
              height={44}
              className="group-hover:scale-110 transition-transform duration-300 object-cover"
            />
          </div>
          <div className="min-w-0 flex flex-col justify-center">
            <h2 className="text-secondary dark:text-white font-bold text-base sm:text-lg lg:text-xl tracking-tight truncate leading-tight">
              Librería <span className="text-primary font-extrabold">y Juguetería Lachi</span>
            </h2>
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
              <LuMapPin className="text-primary shrink-0 w-3.5 h-3.5" />
              <span className="truncate">Av. 9 de Julio 1895 (Esq. Pío XII)</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/" className={`${linkClass('/')} text-sm font-medium hover:scale-105 transition-transform`}>
            Catálogo
          </Link>
          <Link href="/about" className={`${linkClass('/about')} text-sm font-medium hover:scale-105 transition-transform`}>
            Nosotros
          </Link>
        </nav>

        {/* Business Hours */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 text-xs text-gray-600 dark:text-gray-300">
          <LuClock className="text-primary w-4 h-4 shrink-0" />
          <div className="flex flex-col leading-tight">
            <span><strong className="font-semibold text-gray-700 dark:text-gray-200">Lun-Vie:</strong> 8:00-12:00 | 16:00-20:00</span>
            <span><strong className="font-semibold text-gray-700 dark:text-gray-200">Sáb:</strong> 8:00-12:30 | 16:30-20:30</span>
          </div>
        </div>

        {/* Actions (Cart & Theme Toggle & Mobile Hours Button) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Hours Toggle Popover */}
          <div className="relative xl:hidden">
            <button
              onClick={() => setShowHoursMobile(!showHoursMobile)}
              aria-label="Ver horarios"
              className="p-2.5 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors relative"
            >
              <LuClock size={20} className="text-primary" />
            </button>
            {showHoursMobile && (
              <div className="absolute right-0 top-12 w-64 p-3 bg-white dark:bg-neutral-800 rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 text-xs text-gray-600 dark:text-gray-300 z-50 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="font-semibold text-gray-900 dark:text-white flex items-center gap-1.5 border-b border-gray-100 dark:border-white/10 pb-1.5">
                  <LuClock className="text-primary w-3.5 h-3.5" /> Horarios de Atención
                </div>
                <div className="space-y-1">
                  <p><strong className="text-gray-700 dark:text-gray-200">Lun a Vie:</strong><br />8:00 a 12:00 hs y 16:00 a 20:00 hs</p>
                  <p><strong className="text-gray-700 dark:text-gray-200">Sábados:</strong><br />8:00 a 12:30 hs y 16:30 a 20:30 hs</p>
                </div>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link
            href={isCartEnabled ? '/carrito' : '/'}
            className="relative p-2.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors cursor-pointer group"
            aria-label="Carrito de compras"
          >
            {isCartEnabled ? (
              <LuShoppingCart size={22} className="text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors" />
            ) : (
              <FaShoppingCart size={22} className="text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors" />
            )}
            {productos.length > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-extrabold rounded-full size-4 flex items-center justify-center shadow-md animate-pulse">
                {productos.length}
              </span>
            )}
          </Link>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            className="p-2.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors text-gray-700 dark:text-gray-200 hover:text-primary"
          >
            {!mounted ? <div className="size-[20px]" /> : theme === 'light' ? <IoMoon size={20} /> : <IoSunny size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

