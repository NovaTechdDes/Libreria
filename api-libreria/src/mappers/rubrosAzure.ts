import { Rubro } from "../types/Rubro";

interface RubroAzure {
    id_interno: number;
    nombre: string;
}

export const mapRubrosAzure = (rubros: Rubro[]): RubroAzure[] => {
    return rubros.map(rubro => ({
        nombre: rubro.nom_rubro_g.trim().toUpperCase(),
        id_interno: rubro.id_rubro_g
    }))
}