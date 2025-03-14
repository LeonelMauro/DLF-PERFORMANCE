import { Module } from '@nestjs/common';
import { InvoiceService } from './factura.service';
import { InvoiceController } from './factura.controller';

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class FacturaModule {}
