import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { getServerUrl, setServerUrl } from "../service/store.service";
import {
  Server,
  Network,
  ArrowRight,
  Loader2,
  BookOpen,
  AlertCircle,
} from "lucide-react";

export const ServerSetup = ({ onConfigured }: { onConfigured: () => void }) => {
  const [url, setUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const current = getServerUrl();
    if (current) {
      setUrl(current);
    }
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanUrl = url.trim();
    if (!cleanUrl) {
      setErrorMessage("Por favor ingrese la URL o IP del servidor.");
      return;
    }

    if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
      setErrorMessage("La URL debe comenzar con http:// o https://");
      return;
    }

    setSaving(true);
    try {
      // Guardar en el archivo de configuración del PC
      await setServerUrl(cleanUrl);
      onConfigured();
    } catch (err: any) {
      console.error("Error guardando servidor:", err);
      setErrorMessage(
        typeof err === "string" ? err : "Error al guardar la configuración."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#0b0f17] text-slate-100 overflow-hidden font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Ambient background glowing elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-120 h-120 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] background-size[24px_24px] opacity-25 pointer-events-none" />

      {/* Main card panel */}
      <div className="relative w-full max-w-md mx-4 sm:mx-0 z-10">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-8 sm:p-10 shadow-2xl shadow-black/60 transition-all duration-300">
          {/* Header & Logo */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="relative mb-4 group">
              <div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-amber-500/40 to-indigo-500/40 blur-md opacity-70 group-hover:opacity-100 transition duration-300" />
              <div className="relative flex items-center justify-center w-20 h-20 bg-slate-950/90 border border-slate-700/60 rounded-2xl p-3 shadow-inner">
                {logo ? (
                  <img
                    src={logo}
                    alt="Lachi Libreria Logo"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <BookOpen className="w-10 h-10 text-amber-400" />
                )}
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-['Outfit']">
              Lachi Librería
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Configuración de conexión con el servidor
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-5">
            {/* Error message */}
            {errorMessage && (
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-medium animate-in fade-in slide-in-from-top-1 duration-200">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Server URL input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="server-url"
                  className="block text-xs font-semibold tracking-wider text-slate-300 uppercase"
                >
                  Dirección del Servidor (API)
                </label>
                <span className="text-[10px] text-slate-500 flex items-center gap-1">
                  <Network className="w-3 h-3 text-amber-400/80" /> IP / Host
                </span>
              </div>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                  <Server className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="server-url"
                  id="server-url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Ej: http://192.168.1.100:3000"
                  autoComplete="off"
                  disabled={saving}
                  className="w-full bg-slate-950/70 border border-slate-800 focus:border-amber-500/60 text-slate-100 placeholder-slate-500 text-sm rounded-xl pl-10 pr-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-amber-500/20 shadow-sm disabled:opacity-50"
                />
              </div>
              <p className="text-[11px] text-slate-500 pt-0.5">
                Ingrese la IP o dominio donde se encuentra ejecutándose el backend.
              </p>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={saving}
              className="w-full relative group overflow-hidden rounded-xl bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-sm py-3.5 px-4 shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Guardando configuración...</span>
                </>
              ) : (
                <>
                  <span>Conectar y Continuar</span>
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
export default ServerSetup;
