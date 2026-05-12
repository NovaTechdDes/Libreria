import { Color_Relacion } from '@/src/interface/Color';

interface Props {
  color: Color_Relacion;
  producto_id: number;
  colorSeleccionado: number;
  setColorSeleccionado: (color_id: number) => void;
}

export const ButtonSeleccionarColor = ({ color, producto_id, colorSeleccionado, setColorSeleccionado }: Props) => {
  const estilo =
    colorSeleccionado === color.colores?.id
      ? 'ring-2 ring-primary ring-offset-2 scale-110 shadow-sm'
      : 'border border-gray-200 hover:scale-105 hover:border-gray-300';

  const handleChangeColor = () => {
    setColorSeleccionado(color.colores?.id ?? 0);
  };

  return (
    <button
      type="button"
      style={{ backgroundColor: color?.colores?.codigo }}
      className={`${estilo} cursor-pointer w-5 h-5 md:w-6 md:h-6 rounded-full transition-all duration-200 ease-out`}
      onClick={handleChangeColor}
      title={color.colores?.color}
    />
  );
};
