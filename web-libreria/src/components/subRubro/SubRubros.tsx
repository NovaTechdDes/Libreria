
import { SubRubrosSelect } from './SubRubrosSelect';
import { getSubRubros } from '@/src/helper/getSubRubros';

interface Props {
  rubroActivo: number;
  subRubroActivo: number;
}

export const SubRubros = async ({ rubroActivo, subRubroActivo }: Props) => {
  if (rubroActivo === 0 || rubroActivo === undefined) {
    return null;
  }

  const subRubros = await getSubRubros(rubroActivo.id);

  return (
    <div className="w-full py-4 px-4 flex flex-col gap-2">
      <label htmlFor="subrubro-select" className="text-xs font-bold text-neutral uppercase tracking-widest opacity-80">
        Sub Rubros
      </label>
      <SubRubrosSelect subRubros={subRubros} subRubroActivo={Number(subRubroActivo)} />
    </div>
  );
};
