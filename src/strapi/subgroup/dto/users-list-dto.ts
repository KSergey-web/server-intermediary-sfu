import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { IUser } from 'src/interfaces/user.interface';

export class UsersListDTO {
  @IsArray()
  @ApiProperty()
  users: IUser[];
}
