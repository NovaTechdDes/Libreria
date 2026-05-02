"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { BsFillPaletteFill } from "react-icons/bs";
import { FiBox, FiLogOut } from "react-icons/fi";

export const AsideBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      label: "Inventario",
      icon: FiBox,
      href: "/admin/productos",
    },
    {
      label: "Gestión de Colores",
      icon: BsFillPaletteFill,
      href: "/admin/colores",
    },
  ];

  const handleLogOut = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    router.push("/admin/login");
  };

  return (
    <aside className="w-[280px] h-screen bg-white border-r border-slate-400 flex flex-col py-8 shadow-[1px_0_10px_rgba(0,0,0,0.02)]">
      {/* Navegación Principal */}
      <div className="flex flex-col items-center gap-2 px-4">
        <Image
          className="rounded-full"
          src="/Icon.png"
          alt="Logo"
          width={50}
          height={50}
        />
        <h2 className="text-center text-2xl font-bold text-slate-900 mb-8">
          Lachi Admin
        </h2>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all group relative overflow-hidden ${
                isActive
                  ? "bg-teal-50 text-teal-600"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon
                className={`w-5 h-5 ${isActive ? "text-teal-500" : "text-slate-400 group-hover:text-slate-900"}`}
              />
              <span className="text-[15px]">{item.label}</span>

              {/* Indicador lateral activo */}
              {isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-teal-500 rounded-l-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Botón Cerrar Sesión */}
      <div className="px-4 mt-auto pt-8 border-t border-slate-50">
        <button
          onClick={handleLogOut}
          className="w-full flex items-center gap-3 px-4 py-4 text-slate-500 hover:text-red-500 font-bold transition-all group"
        >
          <FiLogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="text-[15px]">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};
