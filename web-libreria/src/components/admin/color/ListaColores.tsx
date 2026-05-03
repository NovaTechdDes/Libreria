import {  IoChevronBack, IoChevronForward } from 'react-icons/io5'
import { ColorItem } from './ColorItem';
import { getColores } from '@/src/helper/getColores';


export const ListaColores = async() => {
  const colores = await getColores(1, '')

    
  return (
    <div className="mt-12 bg-white flex-1 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
      
      {/* Header de la Lista */}
      <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
        <h2 className="text-slate-500 font-semibold text-sm">{colores?.length || 0} Colores registrados</h2>
        
        <div className='gap-2 flex items-center'>
          <label htmlFor="buscador" className='text-slate-500 font-semibold text-sm'>Buscador</label>
          <input 
          type="text" 
          name="buscador" 
          id="buscador"
          placeholder='Buscar color por nombre...'
          className='border-2 border-slate-200 rounded-2xl px-4 py-2 text-black placeholder:text-slate-400'
          />
        </div>
      </div>

      {/* Grid de Colores */}
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {colores?.map((color) => (
          <ColorItem key={color.id} color={color} />
        ))}

      </div>

      {/* Paginación */}
      <div className="p-6 border-t border-slate-50 flex items-center justify-between">
        <button className="flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-slate-800 transition-colors">
          <IoChevronBack size={18} />
          Anterior
        </button>

        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-xl bg-teal-700 text-white font-bold flex items-center justify-center shadow-md shadow-teal-700/20">1</button>
          <button className="w-10 h-10 rounded-xl text-slate-500 font-bold flex items-center justify-center hover:bg-slate-100">2</button>
          <button className="w-10 h-10 rounded-xl text-slate-500 font-bold flex items-center justify-center hover:bg-slate-100">3</button>
        </div>

        <button className="flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-slate-800 transition-colors">
          Siguiente
          <IoChevronForward size={18} />
        </button>
      </div>

    </div>
  )
}
