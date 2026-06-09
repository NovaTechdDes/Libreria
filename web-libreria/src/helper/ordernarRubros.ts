import { Rubro } from "../interface/Rubro"

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