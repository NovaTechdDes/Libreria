import { Producto_VistoBackEnd } from "@/src/interface/Producto_Visto";
import Image from "next/image";

interface Props {
  elem: Producto_VistoBackEnd;
}

export const ProductoVistosItem = ({ elem }: Props) => {
  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
      {/* Producto (Imagen + Nombre) */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200/60 flex items-center justify-center">
            {elem.url_imagen ? (
              <Image
                src={elem.url_imagen}
                alt={elem.descripcion}
                fill
                sizes="48px"
                className="object-contain p-1"
              />
            ) : (
              <span className="text-[10px] text-slate-400 font-medium">Sin img</span>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-slate-900 truncate max-w-xs sm:max-w-md">
              {elem.descripcion}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              ID: #{elem.id_producto}
            </span>
          </div>
        </div>
      </td>

      {/* Stock */}
      <td className="px-4 py-3">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
          (elem.cantidad ?? 0) > 0 
            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/50' 
            : 'bg-rose-50 text-rose-600 border border-rose-200/50'
        }`}>
          {elem.cantidad ?? 0} un.
        </span>
      </td>

      {/* Precio */}
      <td className="px-4 py-3 text-sm font-bold text-slate-800">
        ${Number(elem.precio ?? 0).toLocaleString('es-AR')}
      </td>

      {/* Vistas */}
      <td className="px-4 py-3 text-right">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-full border border-indigo-100 shadow-xs">
          🔥 {elem.vistas ?? 0} vistas
        </span>
      </td>
    </tr>
  );
};
