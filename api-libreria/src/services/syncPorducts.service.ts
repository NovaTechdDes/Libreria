import { obtenerRubros } from "./rubro.service";
import { supabase } from "../utils/supabase";
import { mapRubrosSupabase } from "../mappers/rubrosSupaase";
import { mapSubRubrosSupabase } from "../mappers/subRubrosSupabase";
import { obtenerProductosPorRubro } from "./productos.service";
import { mapProductos } from "../mappers/mapProductos";

const rubrosSync = process.env.RUBROS?.split(",") || [];

// 1. Normalizar los nombres a minúsculas y sin espacios para evitar errores de tipeo
const rubrosSyncLower = rubrosSync.map((r) => r.toLowerCase().trim());

export const syncProducts = async () => {
  try {
    console.log("Iniciando Sincronizacion...");

    const rubros = await obtenerRubros();

    const rubrosMap = mapRubrosSupabase(rubros.rubros);

    const { error } = await supabase.from("rubros").upsert(rubrosMap, {
      onConflict: "id_interno",
    });

    const { error: errorSubrubros } = await supabase
      .from("subrubros")
      .upsert(mapSubRubrosSupabase(rubros.subrubros), {
        onConflict: "id_interno",
      });

    if (error) throw error;
    if (errorSubrubros) throw errorSubrubros;

    // 2. Filtrar los Rubros Generales para obtener sus id_rubro_g
    const parentIds = rubros.rubros
      .filter((r) =>
        rubrosSyncLower.includes(r.nom_rubro_g.toLowerCase().trim()),
      )
      .map((r) => r.id_rubro_g);

    // 3. Filtrar los Sub Rubros que pertenezcan a esos parentIds y obtener sus id_rubro (IDs finales)
    const subRubrosIds: number[] = rubros.subrubros
      .filter((sub) => parentIds.includes(sub.id_rubro_g))
      .map((sub) => sub.id_rubro);
    console.log("IDs de subrubros a sincronizar:", subRubrosIds);

    // sync products
    const productos = await obtenerProductosPorRubro(subRubrosIds);

    const { error: errorProductos } = await supabase
      .from("productos")
      .upsert(mapProductos(productos), {
        onConflict: "id_interno",
      });

    if (errorProductos) throw errorProductos;

    console.log("Productos sincronizados correctamente");
  } catch (error) {
    console.error("Error en la sincronizacion:", error);
    throw error;
  }
};
