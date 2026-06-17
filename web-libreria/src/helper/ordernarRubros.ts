import { Rubro } from "../interface/Rubro"
import { SubRubro } from "../interface/SubRubro";

const ordenRubros = [
    'TODOS',
    'LIBRERIA',
    'JUGUETERIA',
    'MARROQUINERIA',
    'REGALERIA',
    'BAZAR',
    'BEAUTY-BELLEZA',
    'PERFUMERIA',
    'BIJOUTERIE',
    'INFLABLE',
    'INVIERNO',
    'NAVIDAD',
    'PELUCHES',
    'PROMOCIONES OFERTAS'
]


const ordenMap = new Map(
    ordenRubros.map((nombre, index) => [nombre, index])
);



export const ordenarRubros = (rubros: Rubro[]) => {
    return rubros.filter((rubro) => ordenMap.has(rubro.nombre)).sort((a, b) => (ordenMap.get(a.nombre)! - ordenMap.get(b.nombre)!))
}

export const ordenarSubRubros = (subrubros: SubRubro[]) => {
    const primerElemento = 'TODOS';

    return [...subrubros].sort((a, b) => {
        if(a.nombre === primerElemento ) return -1;
        if(b.nombre === primerElemento ) return 1;
        
        return a.nombre.localeCompare(b.nombre);
    })
}