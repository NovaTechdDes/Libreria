import { Producto } from "@/src/interface/Producto"
import { useProductoStore } from "@/src/store/producto.store";
import Image from "next/image";

interface Props{
    producto: Producto
}

export const  InventarioItem = ({producto}:Props) => {
  const { setProductoSeleccionado } = useProductoStore();
  return (
    <tr
                key={producto.id}
                className="hover:bg-slate-50/50 transition-colors group"
              >

                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-100 flex-shrink-0">
                      {producto.imagen_url ? (
                        <Image
                          src={producto.imagen_url}
                          alt={producto.descripcion}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <span className="text-[10px]">Sin imagen</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[15px] font-bold text-slate-900 truncate">
                        {producto.descripcion}
                      </span>
                      <span className="text-[12px] font-medium text-slate-400">
                        SKU: {producto.codigo || "N/A"}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-[15px] font-bold ${
                        (producto.cantidad ?? 0) < 10
                          ? "text-orange-500"
                          : "text-slate-600"
                      }`}
                    >
                      {producto.cantidad ?? 0}
                    </span>
                    <Toggle active={(producto.cantidad ?? 0) > 0} />
                  </div>
                </td>


                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <span className="text-[15px] font-bold text-slate-900">
                      ${(producto.precio ?? 0).toLocaleString("es-AR")}
                    </span>
                    <Toggle active={true} />
                  </div>
                </td>


                <td className="px-6 py-5 text-right">
                  <div className="flex justify-start">
                    <Toggle active={producto.activo ?? false} />
                  </div>
                </td>

                <td className="text-center">
                  <button 
                    onClick={() => setProductoSeleccionado(producto)}
                    className="text-teal-600 hover:text-teal-800"
                  >
                    Editar
                  </button>
                </td>
              </tr>
  )
}


const Toggle = ({ active }: { active: boolean }) => (
  <div
    className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
      active ? "bg-teal-500" : "bg-slate-200"
    }`}
  >
    <div
      className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${
        active ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </div>
);