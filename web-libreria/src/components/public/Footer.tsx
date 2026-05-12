import React from 'react';
import Link from 'next/link';
import { BiShareAlt, BiGlobe } from 'react-icons/bi';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-neutral-100 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
          {/* Logo & Info */}
          <div className="max-w-xs">
            <h2 className="text-xl font-bold text-primary mb-2">Librería Lachi</h2>
            <p className="text-sm text-neutral/60 leading-relaxed">© {new Date().getFullYear()} Librería & Juguetería. Todos los derechos reservados.</p>
          </div>

          {/* Links & Copyright */}
          <div className="flex flex-col items-center flex-1">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-4">
              <Link href="/about" className="text-sm font-medium text-secondary hover:text-primary transition-colors">
                Nosotros
              </Link>
              <Link href="/servicios" className="text-sm font-medium text-secondary hover:text-primary transition-colors">
                Servicios de Impresión
              </Link>
            </div>
            <Link href="/politicas" className="text-xs text-neutral/50 hover:text-primary transition-colors">
              Políticas de Devolución
            </Link>
          </div>

          {/* Socials */}
          <div className="flex gap-4">
            <button className="bg-tertiary p-2.5 rounded-full text-secondary hover:bg-primary hover:text-white transition-all shadow-sm">
              <BiShareAlt className="size-5" />
            </button>
            <button className="bg-tertiary p-2.5 rounded-full text-secondary hover:bg-primary hover:text-white transition-all shadow-sm">
              <BiGlobe className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
