import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IEquipment } from '../interfaces/equipment.interface';

export class EquipmentCommandDto {
  @ApiProperty()
  @IsString()
  command: string;

  equipment: IEquipment;
}
