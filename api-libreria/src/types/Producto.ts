export interface Producto {
  id_articulo: number;
  codigo: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  marca?: string;
  rubro_tempo?: string;
  id_rubro: number;
  activo: boolean;
  rubro?: {
    rubro_g: {
      id_rubro_g: number;
      nom_rubro_g: string;
    };
    sub_rubro: {
      id_rubro: number;
      nom_rubro: string;
    };
  };
}
