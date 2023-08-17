import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevicesModule } from './devices/devices.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MqttModule } from './mqtt/mqtt.module';
import { SamplesModule } from './samples/samples.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/iot'),
    ConfigModule.forRoot(),
    DevicesModule,
    MqttModule,
    SamplesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
