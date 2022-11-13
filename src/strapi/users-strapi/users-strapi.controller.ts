import { Controller } from '@nestjs/common';
import { UsersStrapiService } from './users-strapi.service';

@Controller('users-strapi')
export class UsersStrapiController {
  constructor(private readonly usersStrapiService: UsersStrapiService) {}
}
