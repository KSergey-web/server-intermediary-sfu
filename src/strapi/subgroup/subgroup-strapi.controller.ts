import { Body, Controller, Param, Patch, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { UsersListDTO } from './dto/users-list-dto';
import { SubgroupStrapiService } from './subgroup-strapi.service';

@Controller('strapi/subgroups')
export class SubgroupStrapiController {
  constructor(private readonly subgroupStrapiService: SubgroupStrapiService) {}

  @ApiBearerAuth()
  @Patch(':subgroupId/users')
  @ApiParam({ name: 'subgroupId' })
  async redirectCommand(
    @Body() dto: UsersListDTO,
    @Param('subgroupId') subgroupId: number,
    @Query('jwt') jwt: string,
  ): Promise<any> {
    return this.subgroupStrapiService.patchSubgroupByUsersFromLtab(
      subgroupId,
      dto.users,
      jwt,
    );
  }
}
