
import { RubroItem } from './RubroItem';
import { DragScrollContainer } from './DragScrollContainer';
import { ordenarRubros } from '@/src/helper/ordernarRubros';
import { api } from '@/src/service';


export const revalidate = 3600; // 1 hora

interface Props {
  rubroActivo: number;
}

export const Rubros = async ({ rubroActivo }: Props) => {

  const { data } = await api.get('api/rubros');

  if (!data.ok) {
    console.error(data.msg);
    return null;
  };


  const rubros = [{ id: 0, nombre: 'TODOS' }, ...data.rubros];

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
