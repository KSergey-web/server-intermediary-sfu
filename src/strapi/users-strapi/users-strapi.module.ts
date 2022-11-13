import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersStrapiController } from './users-strapi.controller';
import { UsersStrapiService } from './users-strapi.service';

@Module({
  controllers: [UsersStrapiController],
  providers: [UsersStrapiService],
  exports: [UsersStrapiService],
  imports: [AuthModule, HttpModule],
})
export class UsersStrapiModule {}
