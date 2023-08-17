import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Sample } from 'src/samples/entities/sample.entity';
import { Model } from 'mongoose';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel('Devices')
    private readonly deviceModel: Model<Sample>,
  ) {}

  create(createDeviceDto: CreateDeviceDto) {
    return 'This action adds a new device';
  }

  async findAll() {
    return await this.deviceModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} device`;
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return `This action updates a #${id} device`;
  }

  remove(id: number) {
    return `This action removes a #${id} device`;
  }
}
