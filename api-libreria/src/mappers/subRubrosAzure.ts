export interface SubRubro {
    id_rubro: number;
    id_rubro_g: number;
    nom_rubro: string;
}

export interface SubRubroAzure {
    id_interno: number;
    nombre: string;
    id_rubro: number;
}

export const mapSubRubrosAzure = (subrubros: SubRubro[]): SubRubroAzure[] => {
    return subrubros.map(subrubro => ({
        id_subrubro: subrubro.id_rubro,
        id_interno: subrubro.id_rubro,
        nombre: subrubro.nom_rubro.trim().toUpperCase(),
        id_rubro: subrubro.id_rubro_g
    }))
}