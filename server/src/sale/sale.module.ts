import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Sale } from './entities/sale.entity';
import { SaleDetail } from './entities/sale-detail.entity';
import { Stock } from 'src/stock/entities/stock.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Sale, SaleDetail, Stock])  ],
  controllers: [SaleController],
  providers: [SaleService],  // No es necesario agregar InvoiceService aquí porque lo trae FacturaModule
})
export class SaleModule {}
