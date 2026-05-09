import { createClient } from '@/src/lib/server';
import { RubroItem } from './RubroItem';

export const revalidate = 3600; // 1 hora

interface Props {
  rubroActivo: number;
}

export const Rubros = async ({ rubroActivo }: Props) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('rubros').select('*');

  if (error) {
    console.log(error);
    return null;
  }

  const rubros = [{ id: 0, nombre: 'TODOS' }, ...data];

  return (
    <div className="w-full py-4 px-2">
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 snap-x snap-proximity">
        {rubros.map((rubro) => (
          <RubroItem key={rubro.id} rubro={rubro} activo={Number(rubroActivo) === rubro.id || (rubroActivo === undefined && rubro.id === 0)} />
        ))}
      </div>
    </div>
  );
};
