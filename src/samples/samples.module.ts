import { Module } from '@nestjs/common';
import { SamplesService } from './samples.service';
import { SamplesController } from './samples.controller';
import { MqttModule } from 'src/mqtt/mqtt.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SamplesSchema } from './entities/sample.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Samples', schema: SamplesSchema }]),
    MqttModule,
  ],
  controllers: [SamplesController],
  providers: [SamplesService],
})
export class SamplesModule {}
