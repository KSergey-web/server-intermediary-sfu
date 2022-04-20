import { Inject, Injectable } from '@nestjs/common';
import { AxiosStatic } from 'axios';
import { AXIOS } from './constants';
import * as FormData from 'form-data';
import { AxiosOperations } from './axios-operations.class';

@Injectable()
export class EquipmentService {
  constructor(@Inject(AXIOS) private axios: AxiosStatic) {}
  async sendCommand(url_server: string, command: string) {
    try {
      const response = await this.axios.get(url_server + command);
      return response.data;
    } catch (error) {
      AxiosOperations.handleAxiosError(error);
    }
  }

  async sendFile(
    url_server: string,
    command: string,
    file: Express.Multer.File,
  ) {
    const formData = new FormData();
    formData.append('file', file.buffer, file.originalname);
    try {
      const response = await this.axios.post(url_server + command, formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });
      return response.data;
    } catch (error) {
      AxiosOperations.handleAxiosError(error);
    }
  }
}
