import { HttpException, Injectable } from '@nestjs/common';
import { Client } from 'ldapts';
import { LTAB_ROOT } from 'src/equipment/constants';
import { IUser } from 'src/interfaces/user.interface';
import { IGroupLtab } from './dto/group-ltab.interface';
import { ILtabResponse } from './dto/ltab-response.interface';
import { IUserLtab } from './dto/user-ltab.interface';
import { LdapParserService } from './ldap-parser.service';
import { LdapSystemConnectionFactory } from './ldap-system-connection-factory.service';

@Injectable()
export class LdapGroupService {
  constructor(
    private ltabSystemConnectionFactory: LdapSystemConnectionFactory,
    private ltabParserService: LdapParserService,
  ) {}

  async getUsersByGroup(group: string): Promise<IUser[]> {
    const searchCn = 'cn=' + group;
    let usersdn: string[];
    const systemClient =
      await this.ltabSystemConnectionFactory.createSystemConnection();
    try {
      const res: ILtabResponse<IGroupLtab> = (await systemClient.search(
        LTAB_ROOT,
        {
          scope: 'sub',
          filter: `(${searchCn})`,
        },
      )) as any;
      usersdn = res.searchEntries[0].member;
      const users = await this.getUsersByDn(usersdn, systemClient);
      return users;
    } catch (ex) {
      if (ex instanceof HttpException) throw ex;
      throw new HttpException(
        { message: `Error in search group. Error: ${ex}` },
        400,
      );
    } finally {
      await systemClient.unbind();
    }
  }

  private async getUsersByDn(
    usersdn: string[],
    client: Client,
  ): Promise<IUser[]> {
    const users: IUser[] = [];
    for (let userdn of usersdn) {
      const user = await this.getUserDataByDn(userdn, client);
      users.push(user);
    }
    return users;
  }

  private async getUserDataByDn(
    userdn: string,
    client: Client,
  ): Promise<IUser | undefined> {
    try {
      const { searchEntries }: ILtabResponse<IUserLtab> = (await client.search(
        userdn,
        {
          scope: 'base',
        },
      )) as any;
      const parsedUser = this.ltabParserService.getUserDataFromLtabRes(
        searchEntries[0],
      );
      return parsedUser;
    } catch (ex) {
      throw ex;
    }
  }
}
