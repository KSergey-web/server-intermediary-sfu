import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { AxiosStatic } from 'axios';
import { AXIOS, STRAPI_SERVER_URL } from './constants';

@Injectable()
export class AccessEquipmentMiddleware implements NestMiddleware {
  constructor( @Inject(AXIOS) private axios: AxiosStatic) {}
  async use(req: any, res: any, next: () => void) {
    try {
      const response = await this.axios.get(STRAPI_SERVER_URL+'/api/users/me');
      console.log(response);
      next();
    } catch (error) {
      console.error(error);
    }
  
  }
}
