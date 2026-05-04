import { Color } from '@/src/interface/Color';
import { FiX } from 'react-icons/fi';

interface Props {
  color: Color;
  removeColor: (color: Color) => void;
}

export const ColorFormularioItem = ({ color, removeColor }: Props) => {
  const handleDeleteColor = () => {
    removeColor(color);
  };

  return (
    <div className="relative group">
      <div className={`w-10 h-10 rounded-full border-2 border-slate-200 shadow-sm cursor-pointer hover:scale-110 transition-transform`} style={{ backgroundColor: color.codigo }} />
      <button onClick={handleDeleteColor} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm">
        <FiX className="w-3 h-3" />
      </button>
    </div>
  );
};
