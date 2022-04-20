import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EquipmentCommandDto {
  @ApiProperty()
  @IsString()
  command: string;

  server_url: string;
}
