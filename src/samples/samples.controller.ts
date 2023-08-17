import { Controller, Get, Body, Param } from '@nestjs/common';
import { SamplesService } from './samples.service';
import { CreateSampleDto } from './dto/create-sample.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('samples')
@Controller('samples')
export class SamplesController {
  constructor(private readonly samplesService: SamplesService) {}

  create(@Body() createSampleDto: CreateSampleDto) {
    return this.samplesService.create(createSampleDto);
  }

  @Get()
  async findAll() {
    const dbSamples = await this.samplesService.findAll();
    const samples = dbSamples.map((ele) => {
      return {
        deviceId: ele.deviceId,
        temperature: ele.temperature,
        humidity: ele.humidity,
        date: ele.createdAt,
      };
    });
    return samples;
  }

  @Get(':serial_number')
  async findBySerialNumber(@Param('serial_number') id: string) {
    const dbSamples = await this.samplesService.findSamplesBySerialNumber(id);
    const samples = dbSamples.map((ele) => {
      return {
        deviceId: ele.deviceId,
        temperature: ele.temperature,
        humidity: ele.humidity,
        date: ele.createdAt,
      };
    });
    return { measurements: samples };
  }
}
