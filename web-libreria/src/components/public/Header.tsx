'use client';

import { useState, useEffect } from 'react';

import { carritoHabilitado } from '@/src/helper/carritoHabilitado';
import { useCarritoStore } from '@/src/store/carrito.store';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { FaShoppingCart } from 'react-icons/fa';
import { IoMoon, IoSunny } from 'react-icons/io5';
import { LuShoppingCart } from 'react-icons/lu';
import { useTheme } from '@/src/providers/ThemeProvider';

interface Props {
  habilitado: boolean;
}

export const Header = ({ habilitado }: Props) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const { theme, toggleTheme } = useTheme();
  const { productos, inicio, fin } = useCarritoStore();
  const linkClass = (path: string) => (pathname === path ? 'text-primary font-semibold underline underline-offset-4' : 'text-gray-600 dark:text-gray-400 hover:text-primary transition');

  return (
    <>
      <header className="sticky top-0 z-50 h-20 bg-white/80 dark:bg-black/40 backdrop-blur-md border-b border-gray-100 dark:border-white/5 text-black dark:text-white flex justify-between items-center px-6 md:px-12 transition-all duration-300">
        <Link href={'/'} className="flex items-center gap-3 group cursor-pointer">
          <div className="relative overflow-hidden rounded-full shadow-md group-hover:shadow-lg transition-all">
            <Image src="/Icon.png" alt="Logo" width={48} height={48} className="group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h2 className="hidden md:block text-secondary dark:text-white font-semibold text-xl md:text-2xl tracking-tight">
            Libreria <span className="text-primary font-bold">y Juguetería Lachi</span>
          </h2>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex gap-8 items-center">
            <Link href="/" className={`${linkClass('/')} hover:scale-105 active:scale-95 transition-all`}>
              Catálogo
            </Link>
            <Link href="/about" className={`${linkClass('/about')} hover:scale-105 active:scale-95 transition-all`}>
              Nosotros
            </Link>
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          {carritoHabilitado(inicio, fin, habilitado) ? (
            <Link href={'/carrito'} className="relative group p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors cursor-pointer">
              <LuShoppingCart size={24} className="text-secondary dark:text-white group-hover:text-primary transition-colors" />
              {/* si hay prodcutos en el carrito mostrar cantidad */}
              {productos.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full size-5 flex items-center justify-center shadow-sm transition-all duration-300 scale-100 hover:scale-110">
                  {productos.length}
                </span>
              )}
            </Link>
          ) : (
            <Link href={'/'} className="relative group p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors cursor-pointer">
              <FaShoppingCart size={24} className="text-secondary dark:text-white group-hover:text-primary transition-colors" />
              {/* si hay prodcutos en el carrito mostrar cantidad */}
              {productos.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full size-5 flex items-center justify-center shadow-sm transition-all duration-300 scale-100 hover:scale-110">
                  {productos.length}
                </span>
              )}
            </Link>
          )}

          <button onClick={toggleTheme} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors text-secondary dark:text-white hover:text-primary">
            {!mounted ? <div className="size-[22px]" /> : theme === 'light' ? <IoMoon size={22} /> : <IoSunny size={22} />}
          </button>
        </div>
      </header>
    </>
  );
};
