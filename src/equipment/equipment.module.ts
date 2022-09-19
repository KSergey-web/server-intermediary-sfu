import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { AccessEquipmentMiddleware } from './access-equipment.middleware';
import axios from 'axios';
import { AXIOS, ICONNECTION_LAB_SERVER, ICONNECTION_STRAPI } from './constants';
import { EquipmentGateway } from './equipment.gateway';
import { AxiosLabServerService } from './services/axios-lab-server.service';
import { AxiosStrapiService } from './services/axios-strapi.service';
import { Client } from 'ldapts';

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
  constructor() {
    tryLdap();
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AccessEquipmentMiddleware).forRoutes(EquipmentController);
  }
}

async function tryLdap() {
  const url = 'ldap://10.100.3.101';
  const bindDN = 'cn=read-only-admin,dc=example,dc=com';
  const password = 'password';

  const client = new Client({
    url,
  });

  let isAuthenticated;
  try {
    await client.bind('');
    isAuthenticated = true;
  } catch (ex) {
    isAuthenticated = false;
  } finally {
    console.log(isAuthenticated);
    await client.unbind();
  }
}
