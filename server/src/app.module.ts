import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PerfilModule } from './perfil/perfil.module';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { TaskModule } from './task/task.module';
import { StockModule } from './stock/stock.module';
import { PhotosModule } from './photos/photos.module';

@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Cambia esto si usas un servidor remoto
      port: 5432,        // El puerto por defecto de PostgreSQL
      username: 'leonel', // Tu usuario de la base de datos
      password: '1234', // Tu contraseña de la base de datos
      database: 'NestJs', // El nombre de tu base de datos
      entities: [__dirname + '/**/*.entity{.ts,.js}'],  // Lista de tus entidades
      synchronize: true,       // Solo para desarrollo. No lo uses en producción
    }),
    UserModule,
    PerfilModule,
    PostModule,
    CategoryModule,
    ProductModule,
    TaskModule,
    StockModule,
    PhotosModule,
  ],
  controllers: [AppController, TaskController],
  providers: [AppService, TaskService],
})
export class AppModule {}
