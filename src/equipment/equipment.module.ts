import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import axios from 'axios';
import { AccessEquipmentMiddleware } from './access-equipment.middleware';
import { AXIOS, ICONNECTION_LAB_SERVER, ICONNECTION_STRAPI } from './constants';
import { EquipmentController } from './equipment.controller';
import { EquipmentGateway } from './equipment.gateway';
import { EquipmentService } from './equipment.service';
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
  constructor() {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AccessEquipmentMiddleware).forRoutes(EquipmentController);
  }
}
