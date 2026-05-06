import { Rubro, SubRubro } from '@/interface';

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

export interface SubRubroBackend {
  id_rubro: number;
  nom_rubro: string;
  id_rubro_g: number;
}

export const mapSubRubro = (subRubro: SubRubroBackend): SubRubro => {
  return {
    id_rubro: subRubro.id_rubro,
    nombre_rubro: subRubro.nom_rubro,
    id_rubro_g: subRubro.id_rubro_g,
  };
};
