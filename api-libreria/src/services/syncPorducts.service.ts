import { obtenerRubros } from "./rubro.service";

import { mapRubrosSupabase } from "../mappers/rubrosSupaase";
import { mapSubRubrosSupabase } from "../mappers/subRubrosSupabase";
import { obtenerProductosPorRubro } from "./productos.service";
import { mapProductos } from "../mappers/mapProductos";
import { poolAzure, poolConnectAzure } from "../config/db";
import sql from "mssql";

const rubrosSync = process.env.RUBROS?.split(",") || [];

// 1. Normalizar los nombres a minúsculas y sin espacios para evitar errores de tipeo
const rubrosSyncLower = rubrosSync.map((r) => r.toLowerCase().trim());

export const syncProducts = async () => {
  await poolConnectAzure;
  const pool = poolAzure;
  const transaction = pool.transaction()
  try {
    console.log("Iniciando Sincronizacion...");
    await transaction.begin();

    const rubros = await obtenerRubros();

    const rubrosMap = mapRubrosSupabase(rubros.rubros);

    for (const rubro of rubrosMap) {
      const queryRubros = new sql.Request(transaction);
      queryRubros.input("nombre", rubro.nombre);
      queryRubros.input("id_interno", rubro.id_interno);
      await queryRubros.query(`
        MERGE INTO rubros AS target
        USING (SELECT @nombre AS nombre, @id_interno AS id_interno) AS source
        ON (target.id_interno = source.id_interno)
        WHEN MATCHED THEN 
        UPDATE SET target.nombre = source.nombre
        WHEN NOT MATCHED THEN
          INSERT (nombre, id_interno)
          VALUES (source.nombre, source.id_interno);
      `);
    }

    const subRubrosMap = mapSubRubrosSupabase(rubros.subrubros);

    for (const subRubro of subRubrosMap) {
  
      const querySubRubros = new sql.Request(transaction);
      querySubRubros.input("nombre", subRubro.nombre);
      querySubRubros.input("id_interno", subRubro.id_interno);
      querySubRubros.input("id_rubro_interno", subRubro.id_rubro);
      await querySubRubros.query(`
        MERGE INTO subrubros AS target
        USING (
            SELECT 
                @nombre AS nombre, 
                @id_interno AS id_interno, 
                (SELECT id FROM rubros WHERE id_interno = @id_rubro_interno) AS id_rubro
        ) AS source
        ON (target.id_interno = source.id_interno)
        WHEN MATCHED THEN 
            UPDATE SET target.nombre = source.nombre, target.id_rubro = source.id_rubro
        WHEN NOT MATCHED THEN
            INSERT (nombre, id_interno, id_rubro)
            VALUES (source.nombre, source.id_interno, source.id_rubro);
      `);
    }

    console.log("Rubros y Subrubros sincronizados correctamente");
    const parentIds = rubros.rubros
      .filter((r) => rubrosSyncLower.includes(r.nom_rubro_g.toLowerCase().trim()))
      .map((r) => r.id_rubro_g);
    const subRubrosIds: number[] = rubros.subrubros
    .filter((sub) => parentIds.includes(sub.id_rubro_g))
    .map((sub) => sub.id_rubro)

    console.log('Sincronizando productos')


    // sync products
    const productos = await obtenerProductosPorRubro(subRubrosIds);

    console.log(`Total de productos: ${productos.length}`)
    
    for(const producto of productos){
      const queryProductos = new sql.Request(transaction);
      queryProductos.input("id_interno", producto.id_articulo);
      queryProductos.input("codigo", producto.codigo);
      queryProductos.input("descripcion", producto.descripcion);
      queryProductos.input("id_subrubro_interno", producto.id_rubro);
      queryProductos.input("precio", producto.precio);
      queryProductos.input("cantidad", producto.cantidad);

      await queryProductos.query(`
        MERGE INTO productos AS target
        USING (
            SELECT 
                @id_interno AS id_interno, 
                @codigo AS codigo, 
                @precio AS precio, 
                @cantidad AS cantidad, 
                @descripcion AS descripcion, 
                (SELECT id_subrubro FROM subrubros WHERE id_interno = @id_subrubro_interno) AS id_subrubro
        ) AS source
        ON (target.id_interno = source.id_interno)
        WHEN MATCHED THEN 
        UPDATE SET target.codigo = source.codigo, target.precio = source.precio, target.cantidad = source.cantidad, target.descripcion = source.descripcion, target.id_subrubro = source.id_subrubro
        WHEN NOT MATCHED THEN
          INSERT (id_interno, codigo, precio, cantidad, descripcion, id_subrubro)
          VALUES (source.id_interno, source.codigo, source.precio, source.cantidad, source.descripcion, source.id_subrubro);
      `);
    }


    console.log("Productos sincronizados correctamente");

    await transaction.commit();

    return;
  } catch (error) {
    await transaction.rollback();
    console.error("Error en la sincronizacion:", error);
    throw error;
  }
};
