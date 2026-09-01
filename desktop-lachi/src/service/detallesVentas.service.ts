import api from "./api.service";

export const getDetallesVentas = async (desde: string, hasta: string, subRubro: string, rubro: string) => {
    try {
        const { data } = await api.get('/detallesVentas', {
            params: {
                desde,
                hasta,
                subRubro,
                rubro
            }
        })

        if(data.ok){
            return data.data
        }
        return []
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            msg: 'No se pudo obtener los detalles de ventas'
        }
    }
}