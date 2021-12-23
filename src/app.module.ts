import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JogosModule } from './jogos/jogos.module';

const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(configService.get('DB_CONNECTION_STRING')),
    JogosModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
