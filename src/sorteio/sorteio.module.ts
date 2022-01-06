import { Module } from '@nestjs/common';
import { SorteioService } from './sorteio.service';
import { SorteioController } from './sorteio.controller';
import { JogosModule } from 'src/jogos/jogos.module';
import { SorteioRepository } from './sorteio.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Sorteio, SorteioSchema } from './schemas/sorteio.schema';
import { JogosRepository } from 'src/jogos/jogos.repository';
import { Jogo, JogoSchema } from 'src/jogos/schemas/jogo.schema';

@Module({
  imports: [
    JogosModule,
    MongooseModule.forFeature([{ name: Sorteio.name, schema: SorteioSchema }]),
    MongooseModule.forFeature([{ name: Jogo.name, schema: JogoSchema }])
  ],    
  controllers: [SorteioController],
  providers: [SorteioService, SorteioRepository, JogosRepository]
})
export class SorteioModule {}
