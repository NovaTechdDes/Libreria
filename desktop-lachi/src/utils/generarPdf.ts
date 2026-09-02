import { DetalleVenta } from "../interface";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { save } from '@tauri-apps/plugin-dialog';
import { writeFile } from '@tauri-apps/plugin-fs';

interface PdfOptions {
    detalles: DetalleVenta[],
    desde: string;
    hasta: string
};

export const exportarEstadisticasPDF = async ({detalles, desde, hasta}: PdfOptions) => {
    const rutaSeleccionada = await save({
        defaultPath: `Reporte-ventas_${desde}_a_${hasta}.pdf`,
        filters: [
            {
                name: 'PDF',
                extensions: ['pdf']
            }
        ]
    })

    if (!rutaSeleccionada) return;

    // 1. Instanciamos jsPDF
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    // 2. Encabezado / Titulo y Metadas
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Reporte de articulos Vendidos', 14, 15);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);
    doc.text(`Período: ${desde} hasta ${hasta}`, 14, 22);
    doc.text(`Fecha de emisión: ${new Date().toLocaleDateString("es-AR")}`, 14, 27);

    // 3. Encabezados corregidos
    const headers = [
       [ 'Cod. Interno',
        'Descripcion',
        'Cant. Vendida',
        'Stock Actual',
        'Diferencia',
        'Precio Unit']
    ];



     // 4. Filas formateadas
  const rows = detalles.map((item) => [
    item.codigo_articulo,
    item.producto,
    Number(item.cantidad_art).toFixed(2),
    Number(item.stock).toFixed(2),
    (Number(item.stock) - Number(item.cantidad_art)).toFixed(2),
    item.precio.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }),
  ]);

   // 4. Generar la tabla con autoTable
    autoTable(doc, {startY: 32, head: headers, body: rows, theme: "striped", headStyles: {
        fillColor: [245, 158, 11],
        textColor: [0,0,0],
        fontStyle: "bold",
        fontSize: 9,
    },
    bodyStyles: {
        fontSize: 8
    },
     columnStyles: {
      0: { cellWidth: 25, halign: "left" },
      1: { halign: "left" },
      2: { cellWidth: 25, halign: "right" },
      3: { cellWidth: 25, halign: "right" },
      4: { cellWidth: 25, halign: "right" },
      5: { cellWidth: 30, halign: "right" },
    },
    styles: {
      overflow: "linebreak",
    }
});
    
    // 5. Guardar el archivo PDF
    const pdfBytes = doc.output('arraybuffer');
    await writeFile(rutaSeleccionada, new Uint8Array(pdfBytes));

    return true;
};