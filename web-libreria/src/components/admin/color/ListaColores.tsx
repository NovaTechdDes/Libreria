
import { ColorItem } from './ColorItem';
import { Color } from '@/src/interface/Color';
import { HeaderColores } from './HeaderColores';

interface Props {
  colores: Color[];
}

export const ListaColores = ({ colores }: Props) => {
  
  return (
    <div className="mt-12 bg-white flex-1 rounded-4xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
      {/* Header de la Lista */}
      <HeaderColores colores={colores} />

      {/* Grid de Colores */}
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {colores?.map((color) => (
          <ColorItem key={color.id} color={color} />
        ))}
      </div>

      
    </div>
  );
};
