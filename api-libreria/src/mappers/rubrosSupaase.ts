import { Rubro } from "../types/Rubro";

interface RubroSupabase {
    id_interno: number;
    nombre: string;
}

export const mapRubrosSupabase = (rubros: Rubro[]): RubroSupabase[] => {
    return rubros.map(rubro => ({
        nombre: rubro.nom_rubro_g.trim().toUpperCase(),
        id_interno: rubro.id_rubro_g
    }))
}