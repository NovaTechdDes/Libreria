"use client";
import { useCarritoStore } from "@/src/store/carrito.store";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoMoon } from "react-icons/io5";
import { LuShoppingCart } from "react-icons/lu";

export const Header = () => {
  const pathname = usePathname();
  const { productos } = useCarritoStore();

  console.log(productos);

  const linkClass = (path: string) =>
    pathname === path
      ? "text-primary font-semibold underline underline-offset-4"
      : "text-gray-600 hover:text-primary transition";

  return (
    <header className="h-16  bg-white text-black flex justify-between items-center px-4 ">
      <div className="flex gap-2">
        <Image
          src="/Icon.png"
          className="rounded-full"
          alt="Logo"
          width={45}
          height={45}
        />
        <h2 className="text-primary font-bold text-2xl mt-2">
          Libreria y Jugeteria
        </h2>
      </div>

      <nav>
        <ul className="flex gap-2">
          <Link href="/" className={linkClass("/")}>
            Catálogo
          </Link>
          <Link href="/about" className={linkClass("/about")}>
            Nosotros
          </Link>
        </ul>
      </nav>

      <div className="flex gap-3">
        <LuShoppingCart size={20} />
        {/* si hay prodcutos en el carrito mostrar cantidad */}
        {productos.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
            {productos.length}
          </span>
        )}
        <IoMoon size={20} />
      </div>
    </header>
  );
};
