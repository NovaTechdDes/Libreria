import * as repo from "../repositories/detalleVenta.repository";

export interface DetalleVenteParams {
    desde: string;
    hasta: string;
    rubro?: string;
    subRubro?: string;
};

// Helper para validar formato de fecha YYYY-MM-DD
const isValidDate = (dateStr: string): boolean => {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
};

export async function obtenerDetalleVenta (params: DetalleVenteParams){

    // Validar parámetros obligatorios
    const {desde, hasta, rubro, subRubro} = params;

    if(!desde || !isValidDate(desde)){
        throw new Error("Fecha desde es inválida")
    }

    if(!hasta || !isValidDate(hasta)){
        throw new Error("Fecha hasta es inválida")
    };

    const filters: repo.DetalleVentaFilter = {
        desde, 
        hasta, 
        rubro: rubro ? Number(rubro) : undefined, 
        subRubro: subRubro ? Number(subRubro) : undefined
    };

    return await repo.getDetalleVentaFromDB(filters);
}
