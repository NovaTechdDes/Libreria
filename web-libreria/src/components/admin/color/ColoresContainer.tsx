'use client';

import { Color } from '@/src/interface/Color';
import { FormularioColor } from './FormularioColor';
import { ListaColores } from './ListaColores';
import { useColorStore } from '@/src/store';

interface Props {
  coloresIniciales: Color[];
  totalPages: number;
  currentPage: number;
}

export const ColoresContainer = ({ coloresIniciales, totalPages, currentPage }: Props) => {
  const { colorSeleccionado } = useColorStore();

  return (
    <main className="flex gap-4">
      <FormularioColor key={colorSeleccionado?.id ?? 'nuevo'} />
      <ListaColores colores={coloresIniciales} totalPages={totalPages} currentPage={currentPage} />
    </main>
  );
};
