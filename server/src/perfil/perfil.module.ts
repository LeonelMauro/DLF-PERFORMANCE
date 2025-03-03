import { Module } from '@nestjs/common';
import { PerfilService } from './perfil.service';
import { PerfilController } from './perfil.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Perfil } from './entities/perfil.entity';

@Module({
imports:[
  TypeOrmModule.forFeature([User,Perfil])
],

  controllers: [PerfilController],
  providers: [PerfilService],
})
export class PerfilModule {}
