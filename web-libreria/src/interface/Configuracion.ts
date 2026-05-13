export interface Configuracion {
  id: number;

  frase_descuento: string;
  porcentaje_descuento: number;

  mensaje_informativo: string;
  carrito_habilitado: boolean;
  fecha_inicio: string;
  fecha_fin: string;
}
