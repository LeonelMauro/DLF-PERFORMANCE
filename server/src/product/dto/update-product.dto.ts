import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name: string;

  @Transform(({ value }) => parseFloat(value)) // Convertir cadenas a números
  @IsNumber()
  @IsOptional()
  price: number;

  @IsOptional()
  @IsString()
  code: string;

  @Transform(({ value }) => parseInt(value, 10)) // Convertir cadenas a enteros
  @IsNumber()
  @IsOptional()
  quantity: number;

  @IsOptional()
  @IsArray() // Definir como un array opcional
  @IsString({ each: true }) // Cada elemento del array debe ser un string
  photos?: string[];
  
  @Transform(({ value }) => parseInt(value, 10)) // Convertir cadenas a enteros
  @IsNumber()
  @IsOptional()
  categoryId: number;
}
