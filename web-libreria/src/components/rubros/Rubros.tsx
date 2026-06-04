import { createClient } from '@/src/lib/server';
import { RubroItem } from './RubroItem';
import { DragScrollContainer } from './DragScrollContainer';
import { ordenarRubros } from '@/src/helper/ordernarRubros';


export const revalidate = 3600; // 1 hora

interface Props {
  rubroActivo: number;
}

export const Rubros = async ({ rubroActivo }: Props) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('rubros').select('*, subrubros(*)');

  if (error) {
    console.error(error);
    return null;
  }

  const rubros = [{ id: 0, nombre: 'TODOS' }, ...data];

  const rubrosOrdenados = ordenarRubros(rubros);

  return (
    <div className="w-full py-4 px-2 overflow-hidden">
      <DragScrollContainer className="flex gap-3 overflow-x-auto pb-2 snap-x snap-proximity scrollbar-hide">
        {rubrosOrdenados.map((rubro) => (
          <RubroItem key={rubro.id} rubro={rubro} activo={Number(rubroActivo) === rubro.id || (rubroActivo === undefined && rubro.id === 0)} />
        ))}
      </DragScrollContainer>
    </div>
  );
};
