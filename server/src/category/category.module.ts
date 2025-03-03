import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])], // Registra la entidad como repositorio
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService], // Exporta si otros módulos necesitan este servicio
})
export class CategoryModule {}
