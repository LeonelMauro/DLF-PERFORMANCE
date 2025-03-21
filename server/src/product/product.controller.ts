import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Put, 
  Delete, 
  UseInterceptors, 
  UploadedFiles 
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('photos', 5, {
    storage: diskStorage({
      destination: './photos/uploads',
      filename: (req, file, callback) => {
        const fileName = `${uuidv4()}-${file.originalname}`;
        callback(null, fileName);
      },
    }),
  }))
  async create(
    @Body() createProductDto: CreateProductDto, 
    @UploadedFiles() photos: Express.Multer.File[],
    
  ) {
    if (photos && photos.length > 0) {
      createProductDto.photos = photos.map((photo) => `/photos/uploads/${photo.filename}`);
    }
    console.log('DTO recibido:', createProductDto); // 🔍
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FilesInterceptor('photos', 10, {
    storage: diskStorage({
      destination: './photos/uploads',
      filename: (req, file, callback) => {
        const fileName = `${uuidv4()}-${file.originalname}`;
        callback(null, fileName);
      },
    }),
  }))
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() photos: Express.Multer.File[],
  ) {
    if (photos && photos.length > 0) {
      updateProductDto.photos = photos.map((photo) => `/photos/uploads/${photo.filename}`);
    }
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }
}
