import { ProductosCarrito, useCarritoStore } from '@/src/store/carrito.store';
import Image from 'next/image';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';

interface Props {
  producto: ProductosCarrito;
}

export const CarritoItem = ({ producto }: Props) => {
  const { actualizarCantidad, removerProducto } = useCarritoStore();

  const handleIncrement = () => {
    actualizarCantidad(producto.producto.id_producto!, producto.cantidad + 1);
  };

  const handleDecrement = () => {
    if (producto.cantidad > 1) {
      actualizarCantidad(producto.producto.id_producto!, producto.cantidad - 1);
    } else {
      removerProducto(producto.producto.id_producto!);
    }
  };

  return (
    <article className="flex items-center p-6 gap-6 group">
      {/* Imagen del producto */}
      <div className="relative h-24 w-24 shrink-0">
        {producto.producto.imagenes && JSON.parse(producto.producto.imagenes)[0] ? (
          <Image src={JSON.parse(producto.producto.imagenes)[0]} alt={producto.producto.descripcion} fill className="rounded-xl object-cover shadow-sm border border-slate-100" />
        ) : null}
      </div>

      {/* Detalles del producto */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col">
          <h3 className="text-slate-900 text-lg font-bold truncate group-hover:text-teal-700 transition-colors">{producto.producto.descripcion}</h3>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-0.5">{producto.producto.id_subRubro || 'Librería'}</p>
          {producto.observacion && (
            <div className="flex items-center gap-2 mt-2">
              <span className="w-3 h-3 rounded-full bg-teal-500 shadow-sm" />
              <span className="text-slate-500 text-sm font-medium">{producto.observacion}</span>
            </div>
          )}
        </div>
      </div>

      {/* Precio y Cantidad */}
      <div className="flex flex-col items-end gap-3">
        <p className="text-teal-600 text-xl font-extrabold tracking-tight">${(producto.producto.precio || 0).toLocaleString('es-AR')}</p>

        <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
          <button
            onClick={handleDecrement}
            className="p-1.5 hover:bg-slate-50 rounded-md text-slate-400 hover:text-slate-900 transition-colors"
            title={producto.cantidad === 1 ? 'Eliminar' : 'Disminuir'}
          >
            {producto.cantidad === 1 ? <FiTrash2 className="w-3.5 h-3.5" /> : <FiMinus className="w-3.5 h-3.5" />}
          </button>
          <span className="w-8 text-center font-bold text-slate-800 text-sm">{producto.cantidad}</span>
          <button onClick={handleIncrement} className="p-1.5 hover:bg-slate-50 rounded-md text-slate-400 hover:text-slate-900 transition-colors">
            <FiPlus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
