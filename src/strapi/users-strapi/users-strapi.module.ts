import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UsersStrapiController } from './users-strapi.controller';
import { UsersStrapiService } from './users-strapi.service';

@Module({
  controllers: [UsersStrapiController],
  providers: [UsersStrapiService],
  exports: [UsersStrapiService],
  imports: [HttpModule],
})
export class UsersStrapiModule {}
