import { Controller, Post, Res, Body } from '@nestjs/common';
import { InvoiceService } from './factura.service';
import { Response } from 'express';

@Controller('factura')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  generatePDF(@Body() body: { productos: any[] }, @Res() res: Response) {
    return this.invoiceService.generateInvoice(body, res);
  }
  
}