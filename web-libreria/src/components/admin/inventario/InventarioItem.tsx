'use client';

import { mensaje } from '@/src/helper/mensaje';
import { useMutateProductos } from '@/src/hooks/productos/useMutateProductos';
import { Producto } from '@/src/interface/Producto';
import { useProductoStore } from '@/src/store/producto.store';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  producto: Producto;
}

export const InventarioItem = ({ producto }: Props) => {
  const { startUpdateVisible, startUpdatePrecioVisible, startUpdateStockVisile } = useMutateProductos();
  const { setProductoSeleccionado } = useProductoStore();

  const [isVisibilidad, setVisibilidad] = useState(producto.activo ?? false);
  const [isStockVisible, setStockVisible] = useState(producto.isstock ?? false);
  const [isPrecioVisible, setPrecioVisible] = useState(producto.isvisibleprecio ?? false);

  const handleVisibilidad = async () => {
    const nuevoEstado = !isVisibilidad;
    setVisibilidad(nuevoEstado);

    if (!producto.id_producto) return;

    const res = await startUpdateVisible.mutateAsync({ activo: nuevoEstado, id: producto.id_producto });

    if (res) {
      mensaje('Producto actualizado correctamente', 'success');
    } else {
      mensaje('Error al actualizar el producto', 'error');
      setVisibilidad(isVisibilidad); // Revert if error
    }
  };

  const handleStockVisible = async () => {
    const nuevoEstado = !isStockVisible;
    setStockVisible(nuevoEstado);

    if (!producto.id_producto) return;

    const res = await startUpdateStockVisile.mutateAsync({ activo: nuevoEstado, id: producto.id_producto });

    if (res) {
      mensaje('Stock actualizado correctamente', 'success');
    } else {
      mensaje('Error al actualizar el stock', 'error');
      setStockVisible(isStockVisible); // Revert if error
    }
  };

  const handlePrecioVisible = async () => {
    const nuevoEstado = !isPrecioVisible;
    setPrecioVisible(nuevoEstado);

    if (!producto.id_producto) return;

    const res = await startUpdatePrecioVisible.mutateAsync({ activo: nuevoEstado, id: producto.id_producto });

    if (res) {
      mensaje('Precio actualizado correctamente', 'success');
    } else {
      mensaje('Error al actualizar el precio', 'error');
      setPrecioVisible(isPrecioVisible); // Revert if error
    }
  };

  return (
    <tr key={producto.id_producto} className="hover:bg-slate-50/50 transition-colors group">
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-100 shrink-0">
            {producto.imagen_url ? (
              <Image src={producto.imagen_url} alt={producto.descripcion} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-300">
                <span className="text-[10px]">Sin imagen</span>
              </div>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[15px] font-bold text-slate-900 truncate">{producto.descripcion}</span>
            <span className="text-[12px] font-medium text-slate-400">SKU: {producto.codigo || 'N/A'}</span>
          </div>
        </div>
      </td>

      <td className="px-6 py-5">
        <button onClick={handleStockVisible} className="flex items-center gap-4">
          <span className={`text-[15px] font-bold ${(producto.cantidad ?? 0) < 10 ? 'text-orange-500' : 'text-slate-600'}`}>{producto.cantidad ?? 0}</span>
          <Toggle active={isStockVisible} />
        </button>
      </td>

      <td className="px-6 py-5">
        <button onClick={handlePrecioVisible} className="flex items-center gap-4">
          <span className="text-[15px] font-bold text-slate-900">${(producto.precio ?? 0).toLocaleString('es-AR')}</span>
          <Toggle active={isPrecioVisible} />
        </button>
      </td>

      <td className="px-6 py-5 text-right">
        <button onClick={handleVisibilidad} className="flex justify-start">
          <Toggle active={isVisibilidad} />
        </button>
      </td>

      <td className="text-center">
        <button onClick={() => setProductoSeleccionado(producto)} className="text-teal-600 hover:text-teal-800">
          Editar
        </button>
      </td>
    </tr>
  );
};

const Toggle = ({ active }: { active: boolean }) => (
  <div className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${active ? 'bg-teal-500' : 'bg-slate-200'}`}>
    <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${active ? 'translate-x-5' : 'translate-x-0'}`} />
  </div>
);
