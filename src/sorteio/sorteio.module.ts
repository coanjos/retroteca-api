import { Module } from '@nestjs/common';
import { SorteioService } from './sorteio.service';
import { SorteioController } from './sorteio.controller';
import { JogosModule } from 'src/jogos/jogos.module';

@Module({
  imports: [JogosModule],
  controllers: [SorteioController],
  providers: [SorteioService]
})
export class SorteioModule {}
