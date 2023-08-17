import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { MqttService } from 'src/mqtt/mqtt.service';
import { InjectModel } from '@nestjs/mongoose';
import { Sample } from './entities/sample.entity';
import { Model } from 'mongoose';
import { startOfDay } from 'date-fns';

@Injectable()
export class SamplesService implements OnApplicationBootstrap {
  private topic = 'norton/tcc/+/topic';

  constructor(
    @InjectModel('Samples')
    private readonly sampleModel: Model<Sample>,
    private readonly mqttService: MqttService,
  ) {}
  async onApplicationBootstrap() {
    this.mqttService.subscribe(this.topic);

    this.mqttService.mqttClient.on('message', (topic, message) => {
      const deviceId = topic.split('tcc/')[1].split('/topic')[0];
      console.log('Measurements', message.toJSON);
      const { humidity, temperature } = JSON.parse(message.toString());
      if (topic && deviceId) {
        const airSample = this.create({
          deviceId,
          humidity,
          temperature,
        });
        console.log('Air Sample', airSample);
      }
      console.log('DeviceId', deviceId);

      console.log(`Received message on topic ${topic}: ${message}`);
    });
  }

  async create(createSampleDto: CreateSampleDto) {
    const currentSample = new this.sampleModel(createSampleDto);
    return await currentSample.save();
  }

  async findAll() {
    try {
      const today = startOfDay(new Date());

      return await this.sampleModel.find().exec();
    } catch (err) {
      throw new Error('Cannot read samples');
    }
  }

  async findSamplesBySerialNumber(serialNumber: string): Promise<Sample[]> {
    try {
      const today = startOfDay(new Date());

      return await this.sampleModel
        .find({
          deviceId: serialNumber,
          createdAt: {
            $gte: today,
          },
        })
        .exec();
    } catch (err) {
      throw new Error('Cannot read samples');
    }
  }

  update(id: number, updateSampleDto: UpdateSampleDto) {
    return `This action updates a #${id} sample`;
  }

  remove(id: number) {
    return `This action removes a #${id} sample`;
  }
}
