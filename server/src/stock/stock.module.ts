import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stock, Product])],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
