import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class ObjectIdDTO {
  @ApiProperty()
  @MinLength(1)
  id: number;
}
