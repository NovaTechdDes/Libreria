import Banners from '@/src/components/banners/Banners';
import { Productos } from '@/src/components/Productos/Productos';
import { Rubros } from '@/src/components/rubros/Rubros';
import { SubRubros } from '@/src/components/subRubro/SubRubros';

interface Props {
  searchParams: {
    page: string;
    search: string;
    rubro: number;
    subrubro: number;
  };
}

export default async function Home({ searchParams }: Props) {
  const { page, search, rubro, subrubro } = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = 20;

  return (
    <div className="flex flex-col flex-1 items-center pt-5 bg-zinc-200 dark:bg-transparent font-sans ">
      {/* Rubros */}
      <Rubros rubroActivo={rubro} />
      <SubRubros rubroActivo={rubro} subRubroActivo={subrubro} />

      <Banners />

      {/* Productos */}
      <Productos search={search} currentPage={currentPage} limit={limit} subRubroActivo={subrubro} rubroActivo={rubro} />
    </div>
  );
}
