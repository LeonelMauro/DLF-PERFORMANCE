import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { SaleDetail } from './entities/sale-detail.entity';
import { Product } from 'src/product/entities/product.entity';
import { Stock } from 'src/stock/entities/stock.entity';
import { CreateSaleDto } from './dto/create-sale.dto';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale) private saleRepository: Repository<Sale>,
    @InjectRepository(SaleDetail) private saleDetailRepository: Repository<SaleDetail>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Stock) private stockRepository: Repository<Stock>,
  ) {}
/*  */
async createSale(data: CreateSaleDto): Promise<Sale> {
  const { total, productos } = data;

  const sale = this.saleRepository.create({ total });
  await this.saleRepository.save(sale);

  for (const item of productos) {
    const product = await this.productRepository.findOne({
      where: { id: item.productId },
      relations: ['stock'],
    });

    if (!product || !product.stock) {
      throw new BadRequestException(`Producto ID ${item.productId} no encontrado.`);
    }

    if (product.stock.quantity < item.quantity) {
      throw new BadRequestException(`Stock insuficiente para ${product.name}.`);
    }

    const saleDetail = this.saleDetailRepository.create({
      sale,
      product,
      quantity: item.quantity,
      price: product.price,
    });

    await this.saleDetailRepository.save(saleDetail);

    product.stock.quantity -= item.quantity;
    await this.stockRepository.save(product.stock);
    await this.productRepository.save(product);

    if (product.stock.quantity <= 5) {
      console.warn(`⚠️ Stock bajo de ${product.name}`);
    }
  }

  const savedSale = await this.saleRepository.findOne({
    where: { id: sale.id },
  });

  return savedSale;
}
}