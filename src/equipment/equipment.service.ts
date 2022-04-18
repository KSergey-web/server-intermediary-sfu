import { Inject, Injectable } from '@nestjs/common';
import { AxiosStatic } from 'axios';

@Injectable()
export class EquipmentService {
  constructor( @Inject('AXIOS') private axios: AxiosStatic) {}
  async sendCommand(url_server: string, command: string) {
    try {
      const response = await this.axios.get(url_server+command);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  
}
