import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeviceDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  serialNumber: string;
}
