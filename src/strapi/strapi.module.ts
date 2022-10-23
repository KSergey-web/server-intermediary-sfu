import { Module } from '@nestjs/common';
import { StrapiService } from './strapi.service';
import { StrapiController } from './strapi.controller';

@Module({
  controllers: [StrapiController],
  providers: [StrapiService]
})
export class StrapiModule {}
