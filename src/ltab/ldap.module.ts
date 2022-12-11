import { Module } from '@nestjs/common';
import { LdapSystemConnectionFactory } from './ldap-system-connection-factory.service';
import { LdapAuthService } from './ldap-auth.service';
import { LdapGroupController } from './ldab-group.controller';
import { LdapParserService } from './ldap-parser.service';
import { LdapGroupService } from './ldap-group.service';

@Module({
  controllers: [LdapGroupController],
  providers: [
    LdapAuthService,
    LdapSystemConnectionFactory,
    LdapParserService,
    LdapGroupService,
  ],
  exports: [LdapAuthService, LdapSystemConnectionFactory],
})
export class LdapModule {}
