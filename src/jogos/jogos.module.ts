import { Module } from '@nestjs/common';
import { JogosService } from './jogos.service';
import { JogosController } from './jogos.controller';
import { JogosRepository } from './jogos.repository';

@Module({
  controllers: [JogosController],
  providers: [JogosService, JogosRepository]
})
export class JogosModule {}
