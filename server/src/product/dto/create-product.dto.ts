import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Transform(({ value }) => parseFloat(value)) // Convertir cadenas a números
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsString()
  code: string;

  @Transform(({ value }) => parseInt(value, 10)) // Convertir cadenas a enteros
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsOptional()
  @IsArray() // Asegurar que sea un array
  @IsString({ each: true }) // Cada elemento del array debe ser un string
  photos: string[];
  
  @Transform(({ value }) => parseInt(value, 10)) // Convertir cadenas a enteros
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
