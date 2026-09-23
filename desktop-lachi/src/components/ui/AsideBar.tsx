import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Sun, Moon, LogOut, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { getVersion } from '@tauri-apps/api/app';
import { useEffect, useState } from 'react';
import packageJson from '../../../package.json';
import { useUserStore, useThemeStore } from '../../store';
import logo from '../../assets/logo.png';

const AsideBar = () => {
  const { usuario, logout } = useUserStore();
  const { theme, setTheme } = useThemeStore();
  const location = useLocation();
  const [appVersion, setAppVersion] = useState<string>(packageJson.version);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    getVersion()
      .then((ver) => setAppVersion(ver))
      .catch(() => {});
  }, []);

  const handleLogOut = () => {
    logout();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className={`h-screen flex flex-col justify-between bg-slate-50 dark:bg-[#111113] border-r border-slate-200/80 dark:border-zinc-800/80 transition-all duration-300 shrink-0 ${
        isExpanded ? 'w-56' : 'w-16'
      }`}
    >
      {/* Sección Superior: Logo, Botón Toggle y Navegación */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Brand Header */}
        <div className={`p-3 border-b border-slate-200/70 dark:border-zinc-800/70 flex items-center ${isExpanded ? 'justify-between' : 'justify-center'} gap-2`}>
          {isExpanded ? (
            <>
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl overflow-hidden bg-white dark:bg-zinc-800 border border-slate-200/80 dark:border-zinc-700/60 p-1 flex items-center justify-center shrink-0 shadow-xs">
                  <img src={logo} alt="Lachi Librería" className="w-full h-full object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-['Outfit'] font-bold text-xs tracking-tight text-slate-900 dark:text-zinc-100 truncate">Lachi Librería</h2>
                  <p className="text-[10px] font-medium text-amber-600 dark:text-amber-400 truncate">Librería &amp; Juguetería</p>
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                title="Colapsar menú"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-slate-200/60 dark:hover:bg-zinc-800/60 cursor-pointer transition-colors shrink-0"
              >
                <PanelLeftClose size={17} />
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsExpanded(true)}
              title="Expandir menú"
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:text-amber-600 dark:text-zinc-400 dark:hover:text-amber-400 hover:bg-slate-200/60 dark:hover:bg-zinc-800/60 cursor-pointer transition-all"
            >
              <PanelLeftOpen size={20} />
            </button>
          )}
        </div>

        {/* Menú de Navegación */}
        <div className="p-2 space-y-1.5 flex-1">
          {isExpanded && <p className="px-2.5 py-1 text-[10px] font-bold tracking-wider text-slate-400 dark:text-zinc-500 uppercase">Menú</p>}

          <Link
            to="/"
            title="Estadísticas"
            className={`group flex items-center ${isExpanded ? 'gap-2.5 px-3 py-2' : 'justify-center p-2.5'} rounded-xl transition-all duration-200 cursor-pointer ${
              isActive('/')
                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-medium'
                : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-900 border border-transparent'
            }`}
          >
            <BarChart3
              className={`w-4 h-4 shrink-0 transition-colors duration-200 ${
                isActive('/') ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400 dark:text-zinc-500 group-hover:text-slate-600 dark:group-hover:text-zinc-300'
              }`}
            />
            {isExpanded && <span className="text-xs font-medium truncate">Estadísticas</span>}
          </Link>
        </div>
      </div>

      {/* Sección Inferior: Perfil del Usuario, Selector de Tema y Cerrar Sesión */}
      <div className={`p-2 border-t border-slate-200/50 dark:border-zinc-800/50 bg-slate-100/50 dark:bg-zinc-900/20 flex flex-col gap-2 ${!isExpanded ? 'items-center' : ''}`}>
        {/* Información del Usuario */}
        {isExpanded ? (
          <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-slate-200/30 dark:bg-zinc-800/30 border border-slate-200/50 dark:border-zinc-800/50 min-w-0">
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500 text-white font-bold text-[11px] uppercase shadow-sm shrink-0">
              {usuario?.denominacion ? usuario.denominacion.substring(0, 2) : 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">Operador</p>
              <p className="text-xs font-medium text-slate-700 dark:text-zinc-300 truncate">{usuario?.denominacion || 'Usuario'}</p>
            </div>
          </div>
        ) : (
          <div
            title={`Operador: ${usuario?.denominacion || 'Usuario'}`}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-amber-500 text-white font-bold text-xs uppercase shadow-sm cursor-default"
          >
            {usuario?.denominacion ? usuario.denominacion.substring(0, 2) : 'U'}
          </div>
        )}

        {/* Selector de Tema */}
        {isExpanded ? (
          <div className="p-1 rounded-xl bg-slate-200/60 dark:bg-zinc-800/60 border border-slate-200/50 dark:border-zinc-800/50 flex items-center gap-1 text-xs font-medium">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                theme === 'light'
                  ? 'bg-white dark:bg-zinc-700 text-amber-600 dark:text-amber-400 shadow-xs font-semibold'
                  : 'text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
              title="Modo Claro"
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Claro</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-white dark:bg-zinc-700 text-amber-600 dark:text-amber-400 shadow-xs font-semibold'
                  : 'text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
              title="Modo Oscuro"
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Oscuro</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title={`Alternar tema (Actual: ${theme === 'dark' ? 'Oscuro' : 'Claro'})`}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-amber-600 dark:text-zinc-400 dark:hover:text-amber-400 hover:bg-slate-200/60 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        )}

        {/* Botón de Cerrar Sesión */}
        <button
          onClick={handleLogOut}
          title="Cerrar sesión"
          className={`flex items-center ${isExpanded ? 'justify-between w-full px-3 py-2' : 'justify-center w-10 h-10'} rounded-xl border border-transparent hover:border-red-500/10 text-slate-500 hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-950/20 transition-all duration-200 cursor-pointer`}
        >
          <div className="flex items-center gap-2.5">
            <LogOut className="w-4 h-4 shrink-0" />
            {isExpanded && <span className="text-xs font-medium">Cerrar sesión</span>}
          </div>
        </button>

        {/* Versión de la App */}
        {isExpanded && (
          <div className="text-center py-0.5">
            <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-600">v{appVersion}</span>
          </div>
        )}
      </div>
    </aside>
  );
};

export default AsideBar;
