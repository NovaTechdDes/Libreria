'use client';

import { Rubro } from '@/src/interface/Rubro';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  rubro: Rubro;
  activo: boolean;
}

export const RubroItem = ({ rubro, activo }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    if (rubro.id === 0) {
      router.push(`/`);
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set('rubro', rubro.id.toString());
    params.delete('subrubro');
    router.push(`/?${params.toString()}`);
  };

  return (
    <button
      key={rubro.id}
      onClick={handleClick}
      className={`
              shrink-0 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 snap-start
              ${activo ? 'bg-secondary text-white shadow-md scale-105' : 'bg-white text-secondary border border-gray-100 hover:border-primary hover:text-primary hover:bg-primary/5 shadow-sm'}
              active:scale-95
            `}
    >
      {rubro.nombre}
    </button>
  );
};
