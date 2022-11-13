import { HttpException, Injectable } from '@nestjs/common';
import { Client } from 'ldapts';
import { LoginDTO } from 'src/auth/dto/login-dto.class';
import { LTAB_ROOT } from 'src/equipment/constants';
import { IUser } from 'src/interfaces/user.interface';
import { ILtabResponse } from './dto/ltab-response.interface';
import { IUserLtab } from './dto/user-ltab.interface';
import { LdapParserService } from './ldap-parser.service';
import { LdapSystemConnectionFactory } from './ldap-system-connection-factory.service';

@Injectable()
export class LdapAuthService {
  constructor(
    private ltabSystemConnectionFactory: LdapSystemConnectionFactory,
    private ltabParserService: LdapParserService,
  ) {}

  async getUserDataByUsername(username: string): Promise<IUserLtab> {
    const searchDN = 'cn=' + username;
    const systemClient =
      await this.ltabSystemConnectionFactory.createSystemConnection();
    try {
      const res: ILtabResponse<IUserLtab> = (await systemClient.search(
        LTAB_ROOT,
        {
          scope: 'sub',
          filter: `(${searchDN})`,
        },
      )) as any;
      return res.searchEntries[0];
    } catch (ex) {
      throw ex;
    } finally {
      await systemClient.unbind();
    }
  }

  async authWithLtab(dto: LoginDTO): Promise<IUser> {
    const client = await this.ltabSystemConnectionFactory.createClient();
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
    return this.ltabParserService.getUserDataFromLtabRes(userLtab);
  }

  private async authBind(dn: string, password: string, client: Client) {
    try {
      await client.bind(dn, password);
    } catch (err) {
      throw new HttpException({ message: 'password error' }, 400);
    }
  }
}
