"use client";

import React, { useState } from 'react'
import { IoEyeOutline } from 'react-icons/io5'
import { postColor } from '@/src/helper/postColor'
import { mensaje } from '@/src/helper/mensaje';
import { useColorStore } from '@/src/store';

export const FormularioColor = () => {
  const {colorSeleccionado} = useColorStore();
  const [error, setError] = useState<boolean>(false);
    

  const [nombre, setNombre] = useState('')
  const [codigo, setCodigo] = useState('006A6A')
  const [prevId, setPrevId] = useState<string | undefined>(undefined);

  // Ajustar el estado durante el renderizado para evitar renderizados en cascada (useEffect)
  if (colorSeleccionado && colorSeleccionado.id !== prevId) {
    setNombre(colorSeleccionado.color);
    setCodigo(colorSeleccionado.codigo.replace('#', ''));
    setPrevId(colorSeleccionado.id);
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace('#', '')
    if (val.length <= 6) {
      setCodigo(val.toUpperCase())
    }
  };

  const handleAddColor = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!nombre || !codigo){
      setError(true);
      setTimeout(() => {
        setError(false)
      }, 2500)
      return;
    };

   const res = await postColor(nombre, `#${codigo}`);

   
   if(res){
    mensaje('Color Agregado Correctamente', 'success');
    setNombre('');
    setCodigo('006A6A');
   }
    
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-slate-800 font-bold text-xl tracking-tight">Detalles del Color</h2>
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
      </div>
      
      <form className="space-y-7" onSubmit={handleAddColor}>
        {/* Nombre del Color */}
        <div className="flex flex-col gap-2.5">
          <label htmlFor="nombre" className="text-slate-500 text-[12px] font-bold uppercase tracking-widest ml-1">
            Nombre del Color
          </label>
          <input 
            type="text" 
            id="nombre"
            name="nombre" 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Turquesa Lachi"
            className="w-full px-6 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 transition-all placeholder:text-slate-400 text-slate-700 font-semibold"
          />
          {error && !nombre && (
            <p className="text-red-500 text-xs animate-in fade-in slide-in-from-top-2 duration-300">
              El nombre es requerido
            </p>
          )}
        </div>

        {/* Codigo Hexadecimal */}
        <div className="flex flex-col gap-2.5">
          <label htmlFor="codigo" className="text-slate-500 text-[12px] font-bold uppercase tracking-widest ml-1">
            Código Hexadecimal
          </label>
          <div className="flex gap-4">
            <div className="relative flex-1 group">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-black group-focus-within:text-blue-500 transition-colors">#</span>
              <input 
                type="text" 
                id="codigo"
                name="codigo" 
                value={codigo}
                onChange={handleColorChange}
                placeholder="006A6A"
                maxLength={6}
                className="w-full pl-11 pr-6 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 transition-all placeholder:text-slate-400 text-slate-700 font-bold uppercase tracking-widest"
              />
              {error && !codigo && (
                <p className="text-red-500 text-xs animate-in fade-in slide-in-from-top-2 duration-300">
                  El codigo es requerido
                </p>
              )}
            </div>
            <div className="relative group overflow-hidden rounded-2xl shadow-sm border border-slate-200">
              <input 
                type="color" 
                name="color" 
                value={`#${codigo.length === 6 ? codigo : '000000'}`}
                onChange={(e) => setCodigo(e.target.value.replace('#', '').toUpperCase())}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10 scale-150"
              />
              <div 
                className="w-16 h-full min-h-[56px] transition-transform duration-500 group-hover:scale-125"
                style={{ backgroundColor: `#${codigo.length === 6 ? codigo : 'eee'}` }}
              ></div>
            </div>
          </div>
        </div>


        {/* Vista Previa Section */}
        <div className="pt-2">
          <div 
            className="w-full h-40 border-2 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center gap-3.5 group cursor-default transition-all duration-500 relative overflow-hidden"
            style={{ 
              backgroundColor: `#${codigo.length === 6 ? codigo : '000'}10`, 
              borderColor: `#${codigo.length === 6 ? codigo : '000'}30` 
            }}
          >
            <div 
              className="w-16 h-16 rounded-3xl bg-white shadow-[0_10px_25px_rgba(0,0,0,0.08)] flex items-center justify-center transition-all duration-700 group-hover:rotate-[360deg]"
              style={{ color: `#${codigo.length === 6 ? codigo : '000'}` }}
            >
              <IoEyeOutline size={32} />
            </div>
            <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
              <span className="font-bold text-sm tracking-wide transition-colors" style={{ color: `#${codigo.length === 6 ? codigo : '000'}` }}>
                {nombre || 'Vista Previa'}
              </span>
              <span className="text-[10px] font-black opacity-50 uppercase tracking-[0.2em]" style={{ color: `#${codigo.length === 6 ? codigo : '000'}` }}>
                #{codigo || 'FFFFFF'}
              </span>
            </div>
            
            {/* Subtle background glow */}
            <div 
              className="absolute -right-4 -bottom-4 w-24 h-24 blur-3xl opacity-20 rounded-full"
              style={{ backgroundColor: `#${codigo.length === 6 ? codigo : '000'}` }}
            ></div>
          </div>
        </div>

        {colorSeleccionado 
        ? <button type='submit'  className="w-full bg-[#BFD7FF] hover:bg-[#A8C6FF] text-[#4A72B2] font-black py-5 rounded-2xl transition-all mt-4 shadow-[0_10px_20px_rgba(191,215,255,0.4)] active:scale-[0.98] text-base group">
            <span className="group-hover:tracking-widest transition-all duration-300">ACTUALIZAR COLOR</span>
          </button> 
        
        : <button type='submit'  className="w-full bg-[#BFD7FF] hover:bg-[#A8C6FF] text-[#4A72B2] font-black py-5 rounded-2xl transition-all mt-4 shadow-[0_10px_20px_rgba(191,215,255,0.4)] active:scale-[0.98] text-base group">
            <span className="group-hover:tracking-widest transition-all duration-300">GUARDAR CAMBIOS</span>
        </button>}
      </form>
    </div>
  )
}

