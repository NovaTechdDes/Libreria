import { Rubro } from '@/interface';

export interface RubroBackend {
  id_rubro_g: number;
  nom_rubro_g: string;
}

export const mapRubro = (rubro: RubroBackend): Rubro => {
  return {
    id_rubro: rubro.id_rubro_g,
    nombre_rubro: rubro.nom_rubro_g,
  };
};
