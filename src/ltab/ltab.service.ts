import { HttpException, Injectable } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ConfigService } from '@nestjs/config';
import { Client } from 'ldapts';
import { LoginDTO } from 'src/auth/dto/login-dto.class';
import { LTAB_SERVER_URL } from 'src/equipment/constants';
import { IUser } from 'src/interfaces/user.interface';
import { ILtabResponse } from './dto/ltab-response.interface';
import { IUserLtab } from './dto/user-ltab.interface';

@Injectable()
export class LtabService {
  systemClient: Client;
  readonly root = 'o=SFU';

  private readonly SYSTEM_DN_LTAB: string =
    this.configService.get<string>('SYSTEM_DN_LTAB');
  private readonly SYSTEM_PASSWORD_LTAB: string =
    this.configService.get<string>('SYSTEM_PASSWORD_LTAB');

  constructor(private configService: ConfigService) {
    this.systemClient = new Client({
      url: LTAB_SERVER_URL,
    });
  }

  private async systemBind(client: Client) {
    await client.bind(this.SYSTEM_DN_LTAB, this.SYSTEM_PASSWORD_LTAB);
  }

  async getUserDataByUsername(
    username: string,
  ): Promise<IUserLtab | undefined> {
    const searchDN = 'cn=' + username;
    try {
      await this.systemBind(this.systemClient);
      const res: ILtabResponse<IUserLtab> = (await this.systemClient.search(
        this.root,
        {
          scope: 'sub',
          filter: `(${searchDN})`,
        },
      )) as any;
      return res.searchEntries[0];
    } catch (ex) {
      throw ex;
    } finally {
      await this.systemClient.unbind();
    }
  }

  async authWithLtab(dto: LoginDTO): Promise<IUser> {
    const client = new Client({
      url: LTAB_SERVER_URL,
    });
    let userLtab: IUserLtab;
    try {
      userLtab = await this.getUserDataByUsername(dto.identifier);
      if (!userLtab) {
        throw new HttpException({ message: 'login is not found' }, 400);
      }
      await this.authBind(userLtab.dn, dto.password, client);
    } finally {
      await client.unbind();
    }
    return this.getUserDataFromLtabRes(userLtab);
  }

  private async authBind(dn: string, password: string, client: Client) {
    try {
      await client.bind(dn, password);
    } catch (err) {
      throw new HttpException({ message: 'password error' }, 400);
    }
  }

  private getUserDataFromLtabRes(userLtab: IUserLtab): IUser {
    return {
      username: userLtab.cn,
      email: userLtab.mMail,
      first_name: userLtab.cn,
      last_name: userLtab.givenName,
      patronymic: userLtab.middleName,
    };
  }
}
