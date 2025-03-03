import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CategoryModule } from 'src/category/category.module';
import { MulterModule } from '@nestjs/platform-express';
import { PhotosModule } from 'src/photos/photos.module';
import { Category } from 'src/category/entities/category.entity';
import { Photo } from 'src/photos/entities/photo.entity';


@Module({
  imports: [
    MulterModule.register({
      dest: './photos/uploads', // Carpeta donde se almacenarán los archivos
    }),
    TypeOrmModule.forFeature([Category, Product, Photo]), // Registra el repositorio Product
    CategoryModule, // Importa CategoryModule si se necesita para relaciones
    PhotosModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
