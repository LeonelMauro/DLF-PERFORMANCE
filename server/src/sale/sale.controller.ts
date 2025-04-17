import { Controller, Post, Body, Res } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';

@Controller('sale')
export class SaleController {
  constructor(
    private readonly saleService: SaleService,
  ) {}

  @Post('createSale')
async createSale(@Body() data: CreateSaleDto) {
  return await this.saleService.createSale(data);
}

 
}
