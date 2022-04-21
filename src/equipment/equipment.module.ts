import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { AccessEquipmentMiddleware } from './access-equipment.middleware';
import axios from 'axios';
import { AXIOS } from './constants';
import { EquipmentGateway } from './equipment.gateway';

@Module({
  controllers: [EquipmentController],
  providers: [
    EquipmentService,
    {
      provide: AXIOS,
      useValue: axios,
    },
    EquipmentGateway,
  ],
})
export class EquipmentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AccessEquipmentMiddleware).forRoutes(EquipmentController);
  }
}
