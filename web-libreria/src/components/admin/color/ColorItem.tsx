import { Color } from '@/src/interface/Color';
import { useColorStore } from '@/src/store';
import React from 'react'

interface Props {
    color:  Color;
}

export const ColorItem = ({ color }: Props) => {

    const {setColorSeleccionado } = useColorStore();

    const handleSelectColor = () => {
        setColorSeleccionado(color);
    }

  return (
    <button 
            onClick={handleSelectColor}
            key={color.id} 
            className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            {/* Color Preview */}
            <div 
              className="h-32 w-full transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundColor: `${color.codigo}` }}
            />
            
            {/* Info */}
            <div className="p-5 space-y-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-800 tracking-tight leading-tight">
                    {color.color?.split(' ').map((word, i) => (
                      <React.Fragment key={i}>{word}<br/></React.Fragment>
                    ))}
                  </h3>
                  <p className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">
                    {color.codigo}
                  </p>
                </div>
                
              </div>
            </div>
          </button>
  )
}
