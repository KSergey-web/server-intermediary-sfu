import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginDTO {
  @IsString()
  @MinLength(1)
  @ApiProperty()
  identifier: string;

  @IsString()
  @MinLength(1)
  @ApiProperty()
  password: string;
}
