import { Color_Relacion } from '@/src/interface/Color';

interface Props {
  color: Color_Relacion;
  producto_id: number;
  colorSeleccionado: number;
  setColorSeleccionado: (color_id: number) => void;
}

export const ButtonSeleccionarColor = ({ color, producto_id, colorSeleccionado, setColorSeleccionado }: Props) => {
  const estilo =
    colorSeleccionado === color.colores?.id && producto_id === producto_id ? 'border-2 w-8 h-8 border-gray-500 scale-110' : 'border border-gray-200';

  const handleChangeColor = () => {
    setColorSeleccionado(color.colores?.id ?? 0);
  };

  return <button type="button" style={{ backgroundColor: color?.colores?.codigo }} className={`${estilo} cursor-pointer w-6 h-6 rounded-full`} onClick={handleChangeColor}></button>;
};
