'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/src/lib/client';
import React, { useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiEye, FiLock, FiMail } from 'react-icons/fi';

const LoginPage = () => {
  const router = useRouter();

  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      router.push('inventario');
    } else {
      alert('Error al iniciar sesión: ' + error.message);
      return;
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-[400px] flex flex-col items-center">
        {/* Icono de Cabecera */}
        <div className="w-20 h-20 bg-teal-400 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-400/20 mb-8 relative">
          <Image src="/Icon.png" alt="Logo" width={100} className="rounded-2xl" height={100} />
        </div>

        {/* Títulos */}
        <div className="text-center mb-10">
          <h1 className="text-slate-900 text-4xl font-extrabold tracking-tight mb-2">Librería & Juguetería</h1>
          <p className="text-slate-500 text-lg font-medium">Panel de Administración</p>
        </div>

        {/* Formulario */}
        <form className="w-full space-y-6" onSubmit={handleLogin}>
          {/* Correo */}
          <div className="space-y-2">
            <label className="text-slate-700 font-semibold ml-1">Correo Electrónico</label>
            <div className="relative group">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@libreria.com"
                className="w-full bg-slate-50 border border-slate-400 rounded-xl pl-11 pr-4 py-4 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-teal-400 focus:outline-none transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Contraseña */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-slate-700 font-semibold">Contraseña</label>
              {/* <Link
                href="#"
                className="text-teal-600 hover:text-teal-700 text-sm font-bold transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link> */}
            </div>
            <div className="relative group">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
              <input
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-400 rounded-xl pl-11 pr-12 py-4 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-teal-400 focus:outline-none transition-all shadow-sm"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                <FiEye className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Recordar mi sesión */}
          <div className="flex items-center gap-3 px-1">
            <input type="checkbox" id="remember" className="w-5 h-5 rounded border-slate-300 text-teal-500 focus:ring-teal-500" />
            <label htmlFor="remember" className="text-slate-600 font-medium cursor-pointer">
              Recordar mi sesión
            </label>
          </div>

          {/* Botón Ingresar */}
          <button
            type="submit"
            className="w-full bg-teal-400 hover:bg-teal-500 active:bg-teal-600 text-slate-900 cursor-pointer py-4 rounded-xl shadow-lg shadow-teal-400/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            Ingresar
            <FiArrowRight className="w-5 h-5" />
          </button>
        </form>

        {/* Separador */}
        <div className="w-full border-t border-slate-400 my-10" />

        {/* Volver */}
        <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-all group">
          <FiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Volver a la tienda principal
        </Link>
      </div>
    </main>
  );
};

export default LoginPage;
