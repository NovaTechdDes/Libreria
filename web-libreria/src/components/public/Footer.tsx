import React from 'react';
import Link from 'next/link';
import { FiInstagram, FiMail, FiMessageCircle, FiMapPin, FiPhone, FiClock } from 'react-icons/fi';

export const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-neutral-900/80 border-t border-slate-200 dark:border-white/10 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Logo & Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Librería <span className="text-teal-600 dark:text-primary">Lachi</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Tu compañera ideal en cada etapa escolar y creativa. Calidad, variedad y la mejor atención personalizada.</p>
            <div className="flex gap-3 pt-2">
              <a
                href="https://www.instagram.com/librerialachi?igsh=eWE2MjU1Y3cyeWhl"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-white/5 p-3 rounded-xl text-slate-400 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 hover:shadow-md hover:-translate-y-1 transition-all border border-slate-100 dark:border-white/10"
                aria-label="Instagram"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/5493456414401"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-white/5 p-3 rounded-xl text-slate-400 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:shadow-md hover:-translate-y-1 transition-all border border-slate-100 dark:border-white/10"
                aria-label="WhatsApp"
              >
                <FiMessageCircle className="w-5 h-5" />
              </a>
              <a
                href="mailto:Libreria_lachi@hotmail.com"
                className="bg-white dark:bg-white/5 p-3 rounded-xl text-slate-400 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md hover:-translate-y-1 transition-all border border-slate-100 dark:border-white/10"
                aria-label="Email"
              >
                <FiMail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest">Explorar</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-primary text-sm font-medium transition-colors">
                  Catálogo de Productos
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-primary text-sm font-medium transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Horarios de Atención */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest">Horarios de Atención</h3>
            <div className="space-y-3 text-slate-500 dark:text-slate-400 text-sm">
              <div className="flex items-start gap-2.5">
                <FiClock className="text-teal-600 dark:text-primary w-4 h-4 mt-0.5 shrink-0" />
                <div className="leading-snug">
                  <span className="font-medium text-slate-700 dark:text-slate-300 block">Lunes a Viernes</span>
                  <span className="text-xs">8:00 a 12:00 hs | 16:00 a 20:00 hs</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <FiClock className="text-teal-600 dark:text-primary w-4 h-4 mt-0.5 shrink-0" />
                <div className="leading-snug">
                  <span className="font-medium text-slate-700 dark:text-slate-300 block">Sábados</span>
                  <span className="text-xs">8:00 a 12:30 hs | 16:30 a 20:30 hs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contacto */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-slate-500 dark:text-slate-400 text-sm">
                <FiMapPin className="text-teal-600 dark:text-primary w-4 h-4 mt-0.5 shrink-0" />
                <span className="leading-snug">Av. 9 de Julio 1895, Esquina Pío XII, Chajarí, Entre Ríos</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400 text-sm">
                <FiPhone className="text-teal-600 dark:text-primary w-4 h-4 shrink-0" />
                <span>+54 9 3456 414401</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-200 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 dark:text-slate-500 text-xs font-medium text-center md:text-left">© {new Date().getFullYear()} Librería & Juguetería Lachi. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2">
            <span className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest">Desarrollado por</span>
            <Link href="https://www.novatechdesarrollos.com.ar/" target="_blanck">
              <span className="text-slate-900 dark:text-white font-bold text-xs">NovaTech</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
