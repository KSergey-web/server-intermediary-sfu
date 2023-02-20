import { Body, Controller, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ObjectIdDTO } from 'src/shared/dto/object-id.dto';
import { INewSessionForUserFromLdapDto } from './dto/session-for-user-from-Ltab';
import { IUpdateSessionForUserFromLdapDto } from './dto/update-session-for-user-from-ldap.dto';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @ApiBearerAuth()
  @Post('')
  async createSessionForUserFromLtab(
    @Body() dto: INewSessionForUserFromLdapDto,
    @Query('jwt') jwt: string,
  ): Promise<any> {
    return this.sessionService.createSessionForUserFromLtab(dto, jwt);
  }

  @ApiBearerAuth()
  @Put(':id')
  async updateSessionForUserFromLtab(
    @Body() dto: IUpdateSessionForUserFromLdapDto,
    @Param() params: ObjectIdDTO,
    @Query('jwt') jwt: string,
  ): Promise<any> {
    return this.sessionService.updateSessionForUserFromLdap(
      dto,
      params.id,
      jwt,
    );
  }
}
