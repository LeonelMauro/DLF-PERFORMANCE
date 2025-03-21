import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class InvoiceService {
  async generateInvoice(data: { productos: any[] }, res: Response) {
    if (!data || !Array.isArray(data.productos) || data.productos.length === 0) {
      return res.status(400).json({ error: "'productos' debe ser un array válido" });
    }

    const logoPath = path.join(process.cwd(), 'src', 'factura', 'imag', 'LogoNegocio.jpg');
    const logoBuffer = fs.readFileSync(logoPath);
    const fontPath = path.join(process.cwd(), 'src', 'factura', 'fonts', 'Poppins-Regular.ttf');

    const doc = new PDFDocument({ margin: 30, size: 'A4' });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=factura.pdf');

    doc.pipe(res);

    // 📌 Registrar la fuente Poppins
    doc.registerFont('Poppins', fontPath);
    doc.font('Poppins');

    // Datos del negocio
    const negocio = {
      nombre: "'DLF - Performance' S.A.",
      direccion: "Calle. San Martin 523, Maipú-Mendoza, Argentina",
      cuit: "30-12345678-9",
      telefono: "+54 9 261 5975653",
    };

    // 📌 TÍTULO
    doc
      .fontSize(24)
      .fillColor('#333333')
      .text('DLF - Performance', { align: 'center', underline: true })
      .moveDown(1.5);

    // 📌 LOGO (Izquierda)
    doc.image(logoBuffer, 30, 40, { width: 100, height: 50 });

    doc.moveDown(1);
    doc.fontSize(12).fillColor('#000000').text(`Negocio: ${negocio.nombre}`);
    doc.text(`Dirección: ${negocio.direccion}`);
    doc.text(`CUIT: ${negocio.cuit}`);
    doc.text(`Teléfono: ${negocio.telefono}`);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`);
    doc.text(`Factura N°: ${Math.floor(Math.random() * 1000000)}`);

    // 📌 ENCABEZADOS
    doc
      .fillColor('#ffffff')
      .rect(30, doc.y, 500, 25)
      .fill('#007ACC')
      .stroke();

    let yInicial = doc.y + 7;
    doc
      .fillColor('#ffffff')
      .fontSize(12)
      .text('Producto', 40, yInicial, { width: 150, align: 'left' })
      .text('Código', 200, yInicial, { width: 70, align: 'center' })
      .text('Precio Unitario', 280, yInicial, { width: 100, align: 'center' })
      .text('Cantidad', 390, yInicial, { width: 70, align: 'center' })
      .text('Total', 470, yInicial, { width: 70, align: 'center' });

    doc.moveDown(1).fillColor('#000000');

    let total = 0;

    // 📌 PRODUCTOS
    data.productos.forEach((item, index) => {
      let precio = Number(item.precio);
      let cantidad = Number(item.cantidad) || 1;
      let Total = precio * cantidad;

      let yFila = doc.y;
      if (index % 2 === 0) {
        doc.rect(30, yFila, 500, 20).fill('#f2f2f2').stroke();
      }

      doc
        .fillColor('#000000')
        .fontSize(12)
        .text(item.nombre, 40, yFila + 5, { width: 150, align: 'left' })
        .text(item.code, 200, yFila + 5, { width: 70, align: 'center' })
        .text(`$${precio.toFixed(2)}`, 280, yFila + 5, { width: 100, align: 'center' })
        .text(cantidad.toString(), 390, yFila + 5, { width: 70, align: 'center' })
        .text(`$${Total.toFixed(2)}`, 470, yFila + 5, { width: 70, align: 'right' });

      total += Total;
      doc.moveDown(0.5);
    });

    // 📌 LÍNEA SEPARADORA
    doc
      .moveDown(1)
      .strokeColor('#007ACC')
      .lineWidth(1)
      .moveTo(30, doc.y)
      .lineTo(530, doc.y)
      .stroke();

    // 📌 TOTAL
    doc
      .fontSize(12)
      .fillColor('#333333')
      .text(`Total: $${total.toFixed(2)}`, 470, doc.y + 5, { width: 120, align: 'right' });

    doc.end();
  }
}
