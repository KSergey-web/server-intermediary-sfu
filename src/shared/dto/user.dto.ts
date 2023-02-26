import { ApiProperty } from '@nestjs/swagger';
import { IUser } from 'src/interfaces/user.interface';

export class UserDTO {
  @ApiProperty()
  users: IUser;
}
