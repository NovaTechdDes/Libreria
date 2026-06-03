import { SubRubro } from '@/src/interface/SubRubro';
import { createClient } from '@/src/lib/server';
import { SubRubrosSelect } from './SubRubrosSelect';

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
    <div className="w-full py-4 px-4 flex flex-col gap-2">
      <label htmlFor="subrubro-select" className="text-xs font-bold text-neutral uppercase tracking-widest opacity-80">
        Sub Rubros
      </label>
      <SubRubrosSelect subRubros={subRubros} subRubroActivo={Number(subRubroActivo)} />
    </div>
  );
};
