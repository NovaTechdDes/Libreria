import * as XLSX from "xlsx";
import { save } from '@tauri-apps/plugin-dialog';
import { writeFile } from '@tauri-apps/plugin-fs';
import { DetalleVenta } from "../interface";

interface ExcelOptions {
    detalles: DetalleVenta[];
    desde: string;
    hasta: string;
};

export const exportarEstadisticasExcel = async({detalles, desde, hasta}: ExcelOptions) => {
    const rutaSeleccionada = await save({
        defaultPath: `Reporte-ventas_${desde}_a_${hasta}.xlsx`,
        filters: [
            {
                name: 'Excel WorkBook',
                extensions: ['xlsx']
            }
        ]
    })

    if (!rutaSeleccionada) return;
    
    // 1. Preparar filas con metadata e informacion
    const rows = [
        ["Reporte de articulos vendidos"],
        [`Periodo: ${desde} hasta ${hasta}`],
        [`Fecha de emision: ${new Date().toLocaleDateString('es-AR')}`],
        [],
        ["cod. Interno", "Descripcion", "Cant. Vendida", "Stock Actual", "Diferencia", "Precio Unit."],
        ...detalles.map((item) => [
            item.codigo_articulo,
            item.producto,
            item.cantidad_art,
            item.stock,
            item.stock - item.cantidad_art,
            item.precio
        ])
    ];

    //2. Crear la hoja a partir de la matriz de datos
    const worksheet = XLSX.utils.aoa_to_sheet(rows);

    //3. Crear el libro y agregar la hoja
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Ventas');

  // 4.descargar el archivo .xlsx
  const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

  await writeFile(rutaSeleccionada, new Uint8Array(buffer));

}