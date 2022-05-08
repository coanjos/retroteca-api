import { Module } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { ComentariosController } from './comentarios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comentario, ComentarioSchema } from './schemas/comentario.schema';
import { ComentariosRepository } from './comentarios.repository';

@Module({
  imports:[MongooseModule.forFeature([{ name: Comentario.name, schema: ComentarioSchema }])],
  controllers: [ComentariosController],
  providers: [ComentariosService, ComentariosRepository]
})
export class ComentariosModule {}
