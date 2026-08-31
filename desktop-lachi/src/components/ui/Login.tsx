import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { useUserStore } from "../../store";
import { User, Lock, Eye, EyeOff, ArrowRight, Loader2, BookOpen, AlertCircle } from "lucide-react";

export const Login = () => {
  const { setUsuario } = useUserStore();
  const [denominacion, setDenominacion] = useState("");
  const [clave, setClave] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!denominacion.trim()) {
      setErrorMessage("Por favor ingrese su nombre de usuario.");
      return;
    }
    if (!clave.trim()) {
      setErrorMessage("Por favor ingrese su contraseña.");
      return;
    }

    setIsLoading(true);

    // Simulate auth check / store update
    setTimeout(() => {
      setUsuario({
        id_usuario: 1,
        denominacion: denominacion.trim(),
        clave: clave.trim(),
        administrador: 1,
      });
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#0b0f17] text-slate-100 overflow-hidden font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Ambient background glowing elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[30rem] h-[30rem] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Main card panel */}
      <div className="relative w-full max-w-md mx-4 sm:mx-0 z-10">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-8 sm:p-10 shadow-2xl shadow-black/60 transition-all duration-300">
          
          {/* Header & Logo */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="relative mb-4 group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500/40 to-indigo-500/40 blur-md opacity-70 group-hover:opacity-100 transition duration-300" />
              <div className="relative flex items-center justify-center w-20 h-20 bg-slate-950/90 border border-slate-700/60 rounded-2xl p-3 shadow-inner">
                {logo ? (
                  <img src={logo} alt="Lachi Libreria Logo" className="max-h-full max-w-full object-contain" />
                ) : (
                  <BookOpen className="w-10 h-10 text-amber-400" />
                )}
              </div>
            </div>

            

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-['Outfit']">
              Lachi Librería
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Ingrese sus credenciales para acceder al sistema
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error message */}
            {errorMessage && (
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-medium animate-in fade-in slide-in-from-top-1 duration-200">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Usuario input */}
            <div className="space-y-1.5">
              <label htmlFor="usuario" className="block text-xs font-semibold tracking-wider text-slate-300 uppercase">
                Usuario
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="usuario"
                  id="usuario"
                  value={denominacion}
                  onChange={(e) => setDenominacion(e.target.value)}
                  placeholder="Ej. admin"
                  autoComplete="username"
                  className="w-full bg-slate-950/70 border border-slate-800 focus:border-amber-500/60 text-slate-100 placeholder-slate-500 text-sm rounded-xl pl-10 pr-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-amber-500/20 shadow-sm"
                />
              </div>
            </div>

            {/* Contrasena input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="contrasena" className="block text-xs font-semibold tracking-wider text-slate-300 uppercase">
                  Contraseña
                </label>
              </div>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="contrasena"
                  id="contrasena"
                  value={clave}
                  onChange={(e) => setClave(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full bg-slate-950/70 border border-slate-800 focus:border-amber-500/60 text-slate-100 placeholder-slate-500 text-sm rounded-xl pl-10 pr-11 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-amber-500/20 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-200 transition-colors p-1"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"

              disabled={isLoading}
              className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-sm py-3.5 px-4 shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Verificando...</span>
                </>
              ) : (
                <>
                  <span>Iniciar Sesión</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-8 pt-6 border-t border-slate-800/60 text-center">
            <p className="text-[11px] text-slate-500 tracking-wide">
              Sistema de Escritorio NovaTech &bull; Librería Lachi v0.1.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

