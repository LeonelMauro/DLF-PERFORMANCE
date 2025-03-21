import { IsEmail, IsNotEmpty, IsString, MinLength,  } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
