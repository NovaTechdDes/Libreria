export interface SubRubro {
    id_rubro: number;
    id_rubro_g: number;
    nom_rubro: string;
}

export interface SubRubroSupabase {
    id_interno: number;
    nombre: string;
    id_rubro: number;
}

export const mapSubRubrosSupabase = (subrubros: SubRubro[]): SubRubroSupabase[] => {
    console.log(subrubros)
    return subrubros.map(subrubro => ({
        id_interno: subrubro.id_rubro,
        nombre: subrubro.nom_rubro.trim().toUpperCase(),
        id_rubro: subrubro.id_rubro_g
    }))
}