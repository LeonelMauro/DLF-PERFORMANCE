import { Module } from '@nestjs/common';
import { InvoiceService } from './factura.service';
import { InvoiceController } from './factura.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from 'src/sale/entities/sale.entity';
import { SaleDetail } from 'src/sale/entities/sale-detail.entity';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, SaleDetail,Product])], // <-- Asegura que esto esté aquí
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports: [InvoiceService],  // Exportamos el servicio para que pueda ser usado en otros módulos
})
export class FacturaModule {}
