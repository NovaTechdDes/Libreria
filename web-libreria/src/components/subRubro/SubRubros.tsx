import { SubRubro } from '@/src/interface/SubRubro';
import { createClient } from '@/src/lib/server';
import { SubRubroItem } from './SubRubroItem';

interface Props {
  rubroActivo: number;
  subRubroActivo: number;
}

export const SubRubros = async ({ rubroActivo, subRubroActivo }: Props) => {
  if (rubroActivo === 0 || rubroActivo === undefined) {
    return null;
  }

  const supabase = await createClient();

  const { data, error } = await supabase.from('subrubros').select('*').eq('id_rubro', rubroActivo).order('nombre');

  if (error) {
    console.error(error);
    return null;
  }

  const subRubros = [{ id_subrubro: 0, nombre: 'TODOS', id_rubro: 0 }, ...data] as SubRubro[];

  return (
    <div className="w-full py-4 px-2">
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 snap-x snap-proximity">
        {subRubros.map((subRubro) => (
          <SubRubroItem key={subRubro.id_subrubro} subRubro={subRubro} activo={Number(subRubroActivo) === subRubro.id_subrubro || (subRubroActivo === undefined && subRubro.id_subrubro === 0)} />
        ))}
      </div>
    </div>
  );
};
