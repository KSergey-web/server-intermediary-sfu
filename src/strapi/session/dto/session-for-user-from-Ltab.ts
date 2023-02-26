import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';
import { IUser } from 'src/interfaces/user.interface';

export class INewSessionForUserFromLdapDto {
  @ApiProperty()
  user: IUser;

  @ApiProperty()
  creator: number;

  @ApiProperty()
  equipment: number;

  @ApiProperty()
  @MinLength(1)
  begin: string;

  @ApiProperty()
  @MinLength(1)
  end: string;
}
