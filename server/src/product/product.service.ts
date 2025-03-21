import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Photo } from 'src/photos/entities/photo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Stock } from 'src/stock/entities/stock.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>

  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    console.log('Precio antes de guardar:', createProductDto.price); // 🔍
    const { quantity, price, photos, ...productData } = createProductDto;

    // Crear y guardar solo el producto
    const product = this.productRepository.create({
        ...productData,
        price,    // Guardar precio en product
        quantity, // Guardar cantidad en product
    });

    await this.productRepository.save(product);

    // Si hay fotos, asignarlas correctamente
    if (photos && photos.length > 0) {
        const savedPhotos = await Promise.all(
            photos.map((photoUrl) => 
                this.photoRepository.save(this.photoRepository.create({ url: photoUrl, product }))
            )
        );
        product.photos = savedPhotos;
    }

    // Guardar el producto con las fotos asignadas
    await this.productRepository.save(product);

    // Crear stock si se especifica
    if (quantity !== undefined && price !== undefined) {
        const stock = this.stockRepository.create({
            product, 
            quantity,
            price,
        });
        await this.stockRepository.save(stock);
    }

    return this.productRepository.findOne({
        where: { id: product.id },
        relations: ['photos', 'stock'],  // 🔹 Asegurar que las fotos se incluyan
    });
}


  
  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['category','photos','stock'], // Incluye relaciones si es necesario
    });
  }
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category','photos','stock'], // Incluye relaciones si es necesario
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    console.log("Producto encontrado:", product); // 🔍 Verifica si trae fotos
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
      relations: ['category', 'photos', 'stock'],
    });
  
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  
    if (!updateProductDto || Object.keys(updateProductDto).length === 0) {
      throw new Error('No values provided for update');
    }
  
    const filteredUpdates = Object.fromEntries(
      Object.entries(updateProductDto).filter(([_, value]) => value !== undefined && value !== null)
    );
  
    // 🔹 Actualizar categoría
    if (filteredUpdates.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: filteredUpdates.categoryId },
      });
  
      if (!category) {
        throw new NotFoundException(
          `Category with ID ${filteredUpdates.categoryId} not found`,
        );
      }
  
      product.category = category;
    }
  
    // 🔹 Actualizar fotos
    if (filteredUpdates.photos) {
      await this.photoRepository.delete({ product }); // Eliminar fotos actuales
      product.photos = filteredUpdates.photos.map((url) =>
        this.photoRepository.create({ url }),
      );
    }
    // 🔹 Buscar el stock asociado al producto
    const stock = await this.stockRepository.findOne({
      where: { product: { id: product.id } }, // ✅ Ahora busca por productId
      relations: ['product'],
    });

    if (!stock) {
      throw new NotFoundException(`Stock not found for product ID ${product.id}`);
    }

    // 🔹 Actualizar solo los valores que se envían
    if (filteredUpdates.quantity !== undefined) {
      stock.quantity = filteredUpdates.quantity;
    }

    if (filteredUpdates.price !== undefined) {
      stock.price = filteredUpdates.price;
    }

    // 🔹 Guardar cambios
    await this.stockRepository.save(stock);

    // ✅ ASIGNAR EL STOCK AL PRODUCTO ANTES DE GUARDARLO
    product.stock = stock;

    
    // 🔹 Aplicar solo los valores filtrados al producto
    if (Object.keys(filteredUpdates).length > 0) {
      Object.assign(product, filteredUpdates);
      await this.productRepository.save(product);
    }
    
    return product;
    
    
  }
  
}
