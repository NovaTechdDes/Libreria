import { Productos } from '@/src/components/Productos/Productos';
import { Rubros } from '@/src/components/rubros/Rubros';

interface Props {
  searchParams: {
    page: string;
    search: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const { page, search } = searchParams;
  const currentPage = Number(page) || 1;
  const limit = 20;

  return (
    <div className="flex flex-col flex-1 items-center pt-5 bg-zinc-200 font-sans ">
      {/* Rubros */}
      <Rubros />

      {/* Productos */}
      <Productos search={search} currentPage={currentPage} limit={limit} />
    </div>
  );
}
