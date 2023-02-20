import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CheckJwtMiddleware } from 'src/middlewares/check-jwt.middleware';
import { UsersStrapiModule } from '../users-strapi/users-strapi.module';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';

@Module({
  controllers: [SessionController],
  providers: [SessionService],
  imports: [UsersStrapiModule, HttpModule],
})
export class SessionModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckJwtMiddleware).forRoutes(SessionController);
  }
}
