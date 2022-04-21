import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { AccessEquipmentMiddleware } from './access-equipment.middleware';
import axios from 'axios';
import { AXIOS, ICONNECTION_LAB_SERVER, ICONNECTION_STRAPI } from './constants';
import { EquipmentGateway } from './equipment.gateway';
import { AxiosLabServerService } from './services/axios-lab-server.service';
import { AxiosStrapiService } from './services/axios-strapi.service';

@Module({
  controllers: [EquipmentController],
  providers: [
    EquipmentService,
    {
      provide: AXIOS,
      useValue: axios,
    },
    {
      provide: ICONNECTION_STRAPI,
      useClass: AxiosStrapiService,
    },
    {
      provide: ICONNECTION_LAB_SERVER,
      useClass: AxiosLabServerService,
    },
    EquipmentGateway,
    AxiosLabServerService,
    AxiosStrapiService,
  ],
})
export class EquipmentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AccessEquipmentMiddleware).forRoutes(EquipmentController);
  }
}
