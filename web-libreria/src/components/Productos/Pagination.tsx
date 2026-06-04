"use cliente"

import Link from "next/link";

interface Props {
    currentPage: number;
    totalPages: number;

}

export const Pagination = ({currentPage, totalPages}: Props) => {
  const pages: number[] = [];

  // Manejo de rangos para evitar 0

    const start = Math.max(currentPage - 2, 1);
    const end = Math.min(currentPage + 2, totalPages);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
        {currentPage  > 1   && (
            <Link className="px-3 py-2 rounded-lg border" href={`?page=${currentPage-1}`}>Anterior</Link>
        )}

        {pages.map((page) => (
            <Link  key={page} href={`?page=${page}`} className={`px-4 py-2 rounded-lg border transition ${page === currentPage ? 'bg-teal-600 text-white'  : 'hover:bg-gray-100'} `}>{page}</Link>
        ))}

        {currentPage < totalPages&& (
            <Link href={`?page=${currentPage + 1}`} className="px-4 py-2 rounded-lg border transition hover:bg-gray-100">Siguiente</Link>
        )}
    </div>
  )
}
