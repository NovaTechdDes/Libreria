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

export const ordenarRubros = (rubros: Rubro[]) => {
    const rubrosOrdenados =  rubros.sort((a, b) => {
        return (
            ordenRubros.indexOf(a.nombre) - ordenRubros.indexOf(b.nombre)
        )
    })
    return rubrosOrdenados
}