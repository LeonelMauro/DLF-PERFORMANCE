import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Photo } from 'src/photos/entities/photo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { photos, ...productData } = createProductDto;

    // Mapeo manual para crear la entidad
    const product = this.productRepository.create(productData);

    // Relacionar las fotos si están definidas
    if (photos && photos.length > 0) {
      product.photos = photos.map((photoUrl) => this.photoRepository.create({ url: photoUrl }));
    }

    // Guardar el producto (TypeORM se encargará de guardar las fotos relacionadas gracias a `cascade: true`)
    return this.productRepository.save(product);
  }
  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['category','photos'], // Incluye relaciones si es necesario
    });
  }
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category','photos'], // Incluye relaciones si es necesario
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }
  async remove(id: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    await this.productRepository.remove(product);
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'photos'], // Asegúrate de incluir relaciones relevantes
    });
  
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  
    // Actualizar categoría si se proporciona `categoryId`
    if (updateProductDto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: updateProductDto.categoryId },
      });
  
      if (!category) {
        throw new NotFoundException(
          `Category with ID ${updateProductDto.categoryId} not found`,
        );
      }
  
      product.category = category;
    }
  
    // Actualizar fotos si se proporcionan nuevas
    if (updateProductDto.photos) {
      await this.photoRepository.delete({ product }); // Eliminar fotos actuales
      product.photos = updateProductDto.photos.map((url) =>
        this.photoRepository.create({ url }),
      );
    }
  
    // Actualizar el resto de los campos
    Object.assign(product, updateProductDto);
  
    return this.productRepository.save(product); // Guardar cambios
  }
  
}
