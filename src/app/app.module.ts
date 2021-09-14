import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(configService.get('DB_CONNECTION_STRING'))
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
