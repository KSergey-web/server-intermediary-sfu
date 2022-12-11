import { MiddlewareConsumer, Module } from '@nestjs/common';
import { SubgroupStrapiService } from './subgroup-strapi.service';
import { SubgroupStrapiController } from './subgroup-strapi.controller';
import { UsersStrapiModule } from '../users-strapi/users-strapi.module';
import { HttpModule } from '@nestjs/axios';
import { CheckJwtMiddleware } from '../../middlewares/check-jwt.middleware';

@Module({
  controllers: [SubgroupStrapiController],
  providers: [SubgroupStrapiService],
  imports: [UsersStrapiModule, HttpModule],
})
export class SubgroupStrapiModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckJwtMiddleware).forRoutes(SubgroupStrapiController);
  }
}
