import { Controller } from '@nestjs/common';
import { StrapiService } from './strapi.service';

@Controller('strapi')
export class StrapiController {
  constructor(private readonly strapiService: StrapiService) {}
}
