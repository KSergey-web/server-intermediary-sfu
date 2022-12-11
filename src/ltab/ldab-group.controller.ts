import { Controller, Get, Param } from '@nestjs/common';
import { IUser } from 'src/interfaces/user.interface';
import { LdapGroupService } from './ldap-group.service';

@Controller('ldap/group')
export class LdapGroupController {
  constructor(private ldapGroupService: LdapGroupService) {}

  @Get(':groupName/users')
  async getUsersByGroup(
    @Param('groupName') groupName: string,
  ): Promise<{ users: IUser[] }> {
    const res = await this.ldapGroupService.getUsersByGroup(groupName);
    return { users: res };
  }
}
