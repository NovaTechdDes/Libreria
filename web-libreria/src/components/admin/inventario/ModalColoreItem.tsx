import { Color } from '@/src/interface/Color';
import React from 'react';
import { FiCheck } from 'react-icons/fi';

interface Props {
  color: Color;
  isSelected: boolean;
  toggleColor: (id: string) => void;
}

export const ModalColoreItem = ({ color, isSelected, toggleColor }: Props) => {
  return (
    <div key={color.id} className="flex flex-col items-center gap-2">
      <button
        onClick={() => color.id && toggleColor(color.id)}
        className={`group relative w-12 h-12 rounded-full border-2 transition-all duration-300 ${
          isSelected ? 'border-[#0096B1] scale-110 shadow-lg shadow-teal-100' : 'border-black hover:scale-110 shadow-sm'
        }`}
        style={{ backgroundColor: color.codigo }}
        title={color.color}
      >
        {isSelected && (
          <div className="absolute inset-0 flex items-center justify-center text-white drop-shadow-md">
            <FiCheck className="w-6 h-6 stroke-[3px]" />
          </div>
        )}
      </button>
      <span className="text-[10px] font-bold text-slate-500 uppercase truncate w-full text-center">{color.color}</span>
    </div>
  );
};
