import React from 'react';
import Link from 'next/link';
import { FiInstagram, FiMail, FiMessageCircle, FiMapPin, FiPhone } from 'react-icons/fi';

export const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-black/40 border-t border-slate-200 dark:border-white/5 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Logo & Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Librería <span className="text-teal-600 dark:text-primary">Lachi</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">Tu compañera ideal en cada etapa escolar y creativa. Calidad, variedad y la mejor atención personalizada.</p>
            <div className="flex gap-3 pt-2">
              <a
                href="https://www.instagram.com/librerialachi?igsh=eWE2MjU1Y3cyeWhl"
                target="_blank"
                className="bg-white dark:bg-white/5 p-3 rounded-xl text-slate-400 dark:text-slate-500 hover:text-pink-600 hover:shadow-md hover:-translate-y-1 transition-all border border-slate-100 dark:border-white/10"
                aria-label="Instagram"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/5493456414401"
                target="_blank"
                className="bg-white dark:bg-white/5 p-3 rounded-xl text-slate-400 dark:text-slate-500 hover:text-emerald-600 hover:shadow-md hover:-translate-y-1 transition-all border border-slate-100 dark:border-white/10"
                aria-label="WhatsApp"
              >
                <FiMessageCircle className="w-5 h-5" />
              </a>
              <a
                href="mailto:Libreria_lachi@hotmail.com"
                className="bg-white dark:bg-white/5 p-3 rounded-xl text-slate-400 dark:text-slate-500 hover:text-blue-600 hover:shadow-md hover:-translate-y-1 transition-all border border-slate-100 dark:border-white/10"
                aria-label="Email"
              >
                <FiMail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">Explorar</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-primary text-sm font-medium transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/" className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-primary text-sm font-medium transition-colors">
                  Productos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm">
                <FiMapPin className="text-teal-600 dark:text-primary w-4 h-4" />
                <span>Av. 9 de Julio 1895, Chajarí, Entre Ríos</span>
              </li>
              <li className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm">
                <FiPhone className="text-teal-600 dark:text-primary w-4 h-4" />
                <span>+54 9 3456 414401</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-200 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 dark:text-slate-500 text-xs font-medium text-center md:text-left">© {new Date().getFullYear()} Librería & Juguetería Lachi. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2">
            <span className="text-slate-300 dark:text-slate-600 text-[10px] font-bold uppercase tracking-widest">Powered by</span>
            <span className="text-slate-900 dark:text-white font-bold text-xs">NovaTech</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
