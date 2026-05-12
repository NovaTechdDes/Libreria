'use client';

import { SubRubro } from '@/src/interface/SubRubro';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  subRubro: SubRubro;
  activo: boolean;
}

export const SubRubroItem = ({ subRubro, activo }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    if (subRubro.id_subrubro === 0) {
      router.push(`/`);
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set('subrubro', subRubro.id_subrubro.toString());
    router.push(`/?${params.toString()}`);
  };

  return (
    <button
      key={subRubro.id_subrubro}
      onClick={handleClick}
      className={`
              shrink-0 px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 snap-start
              ${activo ? 'bg-secondary text-white shadow-md scale-105' : 'bg-white text-secondary border border-gray-100 hover:border-primary hover:text-primary hover:bg-primary/5 shadow-sm'}
              active:scale-95
            `}
    >
      {subRubro.nombre}
    </button>
  );
};
