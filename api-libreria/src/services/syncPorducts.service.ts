import { obtenerRubros } from "./rubro.service";
import { obtenerProductosPorRubro } from "./productos.service";
import { poolAzure, poolConnectAzure } from "../config/db";
import sql from "mssql";
import { mapRubrosAzure } from "../mappers/rubrosAzure";
import { mapSubRubrosAzure } from "../mappers/subRubrosAzure";


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

    const rubrosMap = mapRubrosAzure(rubros.rubros);

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

    const subRubrosMap = mapSubRubrosAzure(rubros.subrubros);

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
    
    const payload = productos.map((producto) => ({
      id_interno: producto.id_articulo,
      codigo: producto.codigo,
      descripcion: producto.descripcion,
      id_subrubro_interno: producto.id_rubro,
      precio: producto.precio,
      cantidad: producto.cantidad,
    }));

    const queryProductos = new sql.Request(transaction);
    queryProductos.input("jsonProductos", sql.NVarChar(sql.MAX), JSON.stringify(payload));

    const subRubrosList = subRubrosIds.length > 0 ? subRubrosIds.join(",") : "NULL";

    await queryProductos.query(`
      WITH SubrubrosSincronizados AS (
      SELECT id_subrubro FROM subrubros WHERE id_interno In (${subRubrosList})
      )
      MERGE INTO productos AS target
      USING (
          SELECT 
              j.id_interno,
              j.codigo,
              j.precio,
              j.cantidad,
              j.descripcion,
              (SELECT id_subrubro FROM subrubros WHERE id_interno = j.id_subrubro_interno) AS id_subrubro
          FROM OPENJSON(@jsonProductos)
          WITH (
              id_interno INT,
              codigo VARCHAR(100),
              precio DECIMAL(18, 2),
              cantidad DECIMAL(18, 2),
              descripcion VARCHAR(255),
              id_subrubro_interno INT
          ) AS j
      ) AS source
      ON (target.id_interno = source.id_interno)
      WHEN MATCHED THEN 
      UPDATE SET 
          target.codigo = source.codigo, 
          target.precio = source.precio, 
          target.cantidad = source.cantidad, 
          target.descripcion = source.descripcion, 
          target.id_subrubro = source.id_subrubro,
          target.activo = 1
      --2. si no existe en Azure: lo insertamos como activo
      WHEN NOT MATCHED BY TARGET THEN
        INSERT (id_interno, codigo, precio, cantidad, descripcion, id_subrubro, activo)
        VALUES (source.id_interno, source.codigo, source.precio, source.cantidad, source.descripcion, source.id_subrubro, 1)
      -- 3. Si existe en Azure en estos subrubros pero no vino en los activos locales: Desactivar
      WHEN NOT MATCHED BY SOURCE
        AND target.id_subrubro IN (SELECT id FROM subrubrosSincronizados) THEN
        UPDATE SET target.activo = 0
      
    `);


    console.log("Productos sincronizados correctamente");

    await transaction.commit();

    return;
  } catch (error) {
    await transaction.rollback();
    console.error("Error en la sincronizacion:", error);
    throw error;
  }
};
