import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceSchema } from './repository/mongo/device';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Devices', schema: DeviceSchema }]),
  ],
  controllers: [DevicesController],
  providers: [DevicesService],
})
export class DevicesModule {}
