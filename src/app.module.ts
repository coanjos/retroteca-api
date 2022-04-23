import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JogosModule } from './jogos/jogos.module';
import { SorteioModule } from './sorteio/sorteio.module';
import { MulterModule } from '@nestjs/platform-express';

const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MulterModule.register({
      dest: './files'
    }),
    MongooseModule.forRoot(configService.get('DB_CONNECTION_STRING')),
    JogosModule,
    SorteioModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
