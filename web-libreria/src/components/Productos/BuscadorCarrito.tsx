'use client';
import { useState } from 'react';
import { CgSearch } from 'react-icons/cg';
import { usePathname, useRouter } from 'next/navigation';

export const BuscadorCarrito = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [value, setValue] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.set('search', value);
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full flex items-center bg-white rounded-2xl border border-gray-200/80 hover:border-primary/60 transition-all duration-200 focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(248,113,113,0.1)] px-4 py-2.5 mb-6"
    >
      <CgSearch className="text-gray-400 mr-3 text-xl" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buscar productos ..."
        className="flex-1 text-sm md:text-base text-gray-800 outline-none bg-transparent placeholder:text-gray-400"
        autoCorrect="off"
        autoCapitalize="off"
      />
    </form>
  );
};
