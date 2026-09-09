import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { Home, ArrowLeft, Sun, Moon, Compass } from 'lucide-react';
import logo from '../assets/logo.png';
import { useThemeStore } from '../store';
import packageJson from '../../package.json';
import { getVersion } from '@tauri-apps/api/app';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemeStore();
  const [appVersion, setAppVersion] = useState<string>(packageJson.version || '0.1.2');
  const routeError = useRouteError();

  useEffect(() => {
    getVersion()
      .then((ver) => setAppVersion(ver))
      .catch(() => {});
  }, []);

  // Determinar detalles del error si fue activado por el error boundary del router
  let errorMessage = 'La página o sección a la que intentas acceder no existe, ha sido movida o no se encuentra disponible.';
  let statusCode = 404;

  if (isRouteErrorResponse(routeError)) {
    statusCode = routeError.status;
    if (routeError.statusText) {
      errorMessage = routeError.statusText;
    }
  } else if (routeError instanceof Error) {
    errorMessage = routeError.message;
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-100 dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100 overflow-hidden font-sans selection:bg-amber-500/30 selection:text-amber-700 dark:selection:text-amber-200 transition-colors duration-300 p-4 sm:p-6">
      {/* Botón selector de tema en la esquina superior */}
      <div className="absolute top-4 right-4 z-20">
        <button
          type="button"
          onClick={toggleTheme}
          title={`Tema: ${theme === 'dark' ? 'Modo Oscuro' : 'Modo Claro'} - Clic para alternar`}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800/80 backdrop-blur-md shadow-xs text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer active:scale-95"
        >
          {theme === 'dark' ? (
            <>
              <Moon className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Oscuro</span>
            </>
          ) : (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Claro</span>
            </>
          )}
        </button>
      </div>

      {/* Ambient background glowing elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-120 h-120 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] background-size-[24px_24px] opacity-40 dark:opacity-25 pointer-events-none" />

      {/* Main card */}
      <div className="relative w-full max-w-lg z-10 animate-in fade-in zoom-in-95 duration-300">
        <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/80 rounded-3xl p-8 sm:p-11 shadow-xl shadow-slate-300/40 dark:shadow-2xl dark:shadow-black/60 transition-all duration-300 text-center">
          
          {/* Brand header / Logo */}
          <div className="flex flex-col items-center mb-5">
            <div className="relative mb-3 group">
              <div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-teal-400/30 to-amber-500/30 dark:from-teal-500/40 dark:to-amber-500/40 blur-md opacity-70 group-hover:opacity-100 transition duration-300" />
              <div className="relative flex items-center justify-center w-16 h-16 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/60 rounded-2xl p-1.5 shadow-sm dark:shadow-inner overflow-hidden">
                <img src={logo} alt="Lachi Librería" className="w-full h-full object-contain rounded-xl" />
              </div>
            </div>
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-600 dark:text-amber-400">
              Lachi Librería &bull; Sistema de Reportes
            </span>
          </div>

          {/* Visual 404 display */}
          <div className="relative my-2 select-none">
            <div className="text-8xl sm:text-9xl font-extrabold tracking-tighter bg-linear-to-b from-slate-900 via-slate-700 to-slate-400 dark:from-white dark:via-zinc-200 dark:to-zinc-600 bg-clip-text text-transparent font-['Outfit'] drop-shadow-xs">
              {statusCode}
            </div>
            {/* Subtle badge overlapping the number */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-medium -mt-3 relative z-10 shadow-xs">
              <Compass className="w-3.5 h-3.5" />
              <span>Ruta no encontrada</span>
            </div>
          </div>

          {/* Title & Description */}
          <div className="mt-5 mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-['Outfit']">
              ¡Ups! Página no encontrada
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2.5 max-w-md mx-auto leading-relaxed">
              {errorMessage}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            {/* Botón Volver a Inicio */}
            <Link
              to="/"
              className="w-full sm:w-auto flex-1 group overflow-hidden rounded-xl bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-sm py-3 px-5 shadow-lg shadow-amber-500/25 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Home className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform" />
              <span>Volver al inicio</span>
            </Link>

            {/* Botón Regresar */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto group rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800/80 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 font-medium text-sm py-3 px-5 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:-translate-x-1 transition-transform" />
              <span>Regresar</span>
            </button>
          </div>

          {/* Footer note */}
          <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
            <span>Librería &amp; Juguetería Lachi</span>
            <span className="font-mono">v{appVersion}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
