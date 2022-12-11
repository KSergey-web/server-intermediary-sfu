import { Injectable } from '@nestjs/common';
import { IUser } from 'src/interfaces/user.interface';
import { IUserLtab } from './dto/user-ltab.interface';

@Injectable()
export class LdapParserService {
  constructor() {}

  getUserDataFromLtabRes(userLtab: IUserLtab): IUser {
    return {
      username: userLtab.cn,
      email: userLtab.mMail ?? userLtab.mail,
      first_name: userLtab.sn,
      last_name: userLtab.givenName,
      patronymic: userLtab.middleName,
    };
  }
}
