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

   // 3. Formatear la data para la tabla
   const headers = [['Cod. Interno', 'Descripcion', 'Cant. Vendid', 'Scotck Actual', 'Diferencia', 'Precio Unit.']]

   const rows = detalles.map((item) => [
    item.codigo_articulo,
    item.producto,
    item.cantidad_art.toFixed(2),
    item.stock.toFixed(2),
    (item.stock - item.cantidad_art).toFixed(2),
    item.precio.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2
    })
   ])

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
         0: { cellWidth: 25 },
         1: { cellWidth: "auto" },
         2: { halign: "right", cellWidth: 25 },
         3: { halign: "right", cellWidth: 25 },
         4: { halign: "right", cellWidth: 25 },
         5: { halign: "right", cellWidth: 28 }
    },
    didDrawPage: (data) => {
      const pageCount = doc.getNumberOfPages();
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(
        `Página ${data.pageNumber} de ${pageCount}`,
        doc.internal.pageSize.getWidth() - 30,
        doc.internal.pageSize.getHeight() - 10
      );
    },
});
    
    // 5. Guardar el archivo PDF
    const pdfBytes = doc.output('arraybuffer');
    await writeFile(rutaSeleccionada, new Uint8Array(pdfBytes));

    return true;
};