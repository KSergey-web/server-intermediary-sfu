import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LdapModule } from 'src/ltab/ldap.module';
import { UsersStrapiModule } from 'src/strapi/users-strapi/users-strapi.module';

@Module({
  imports: [HttpModule, LdapModule, UsersStrapiModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
