import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IUser } from 'src/interfaces/user.interface';

export class IUpdateSessionForUserFromLdapDto {
  @ApiProperty()
  user: IUser;

  @ApiPropertyOptional()
  @IsOptional()
  creator?: number;

  @ApiPropertyOptional()
  @IsOptional()
  equipment?: number;

  @ApiPropertyOptional()
  @IsOptional()
  begin?: string;

  @ApiPropertyOptional()
  @IsOptional()
  end?: string;
}
