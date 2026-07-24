import { deleteVariante, postVariante } from "@/src/actions/variantes.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateVariante = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({productoId, nombre}: {productoId: number, nombre: string}) => postVariante(nombre, productoId),
        onSuccess: (data, variables) => {
            if(data) {
                queryClient.invalidateQueries({ queryKey: ['producto', variables.productoId] })
            }
        }
    })
}


export const useDeleteVariante = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({idVariante, id_producto}: {idVariante: number, id_producto: number}) => deleteVariante(idVariante, id_producto),
        onSuccess: ( data, variables ) => 
            queryClient.invalidateQueries({queryKey: ['producto', variables.id_producto]})
    })
}