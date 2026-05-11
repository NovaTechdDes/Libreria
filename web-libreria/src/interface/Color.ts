export interface Color {
  id?: number;
  color: string;
  codigo: string;
}
export interface Color_Relacion {
  colores: {
    id?: number;
    color: string;
    codigo: string;
  };
}
