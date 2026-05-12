import { Color_Relacion } from '@/src/interface/Color';
import { useProductoColorStore } from '@/src/store/producto_color';

interface Props {
  color: Color_Relacion;
  producto_id: number;
}

export const ButtonSeleccionarColor = ({ color, producto_id }: Props) => {
  const { seleccionarProductoColor, productoColorSeleccionado } = useProductoColorStore();

  const estilo =
    productoColorSeleccionado.id_color === color.colores?.id && productoColorSeleccionado.id_producto === producto_id ? 'border-2 w-8 h-8 border-gray-500 scale-110' : 'border border-gray-200';

  const handleChangeColor = () => {
    seleccionarProductoColor(producto_id, color.colores?.id ?? 0);
  };

  return <button type="button" style={{ backgroundColor: color?.colores?.codigo }} className={`${estilo} cursor-pointer w-6 h-6 rounded-full`} onClick={handleChangeColor}></button>;
};
