
import { obtenerRubros } from "./rubro.service";
import { supabase } from "../utils/supabase";
import { mapRubrosSupabase } from "../mappers/rubrosSupaase";
import { mapSubRubrosSupabase } from "../mappers/subRubrosSupabase";

export const syncProducts = async() => {
    try {
        console.log("Iniciando Sincronizacion...");

        const rubros = await obtenerRubros();


        const rubrosMap = mapRubrosSupabase(rubros.rubros);

        const { error } = await supabase
        .from('rubros')
        .upsert(rubrosMap, {
            onConflict: "id_interno"
        });

        const { error: errorSubrubros} = await supabase
        .from('subrubros')
        .upsert(mapSubRubrosSupabase(rubros.subrubros), {
            onConflict: "id_interno"
        });

        if (error) throw error;
        if (errorSubrubros) throw errorSubrubros;

        console.log("Rubros sincronizados correctamente");
        
    } catch (error) {
        console.error("Error en la sincronizacion:", error)
        throw error
    }
}