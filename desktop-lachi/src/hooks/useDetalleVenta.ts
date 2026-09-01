import { useQuery } from "@tanstack/react-query"
import { getDetallesVentas } from "../service/detallesVentas.service"

export const useDetalleVenta = (desde: string, hasta: string, subRubro: string, rubro: string) => {
    return useQuery({
        queryKey: ['detallesVentas', desde, hasta, subRubro, rubro],
        queryFn: () => getDetallesVentas(desde, hasta, subRubro, rubro)
    })
}