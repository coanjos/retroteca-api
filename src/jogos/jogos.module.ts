import { Module } from '@nestjs/common';
import { JogosService } from './jogos.service';
import { JogosController } from './jogos.controller';
import { JogosRepository } from './jogos.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Jogo, JogoSchema } from './schemas/jogo.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: Jogo.name, schema: JogoSchema }])],
  controllers: [JogosController],
  providers: [JogosService, JogosRepository]
})
export class JogosModule {}
