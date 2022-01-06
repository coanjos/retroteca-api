import { Module } from '@nestjs/common';
import { SorteioService } from './sorteio.service';
import { SorteioController } from './sorteio.controller';
import { JogosModule } from 'src/jogos/jogos.module';
import { SorteioRepository } from './sorteio.repository';

@Module({
  imports: [JogosModule],
  controllers: [SorteioController],
  providers: [SorteioService, SorteioRepository]
})
export class SorteioModule {}
