import { getProductoById } from "@/src/actions/producto.actions"
import { useQuery } from "@tanstack/react-query"

export const useProductoById = (id: number) => {
    return useQuery({
        queryKey: ['producto', id],
        queryFn: () => getProductoById(id),
        enabled: !!id,
    })
}