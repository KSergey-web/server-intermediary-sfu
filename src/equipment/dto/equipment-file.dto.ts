import { ApiProperty } from '@nestjs/swagger';

export class EquipmentFileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
