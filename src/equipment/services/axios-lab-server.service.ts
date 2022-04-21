import { Inject, Injectable } from '@nestjs/common';
import { ILabServerOutput } from '../interfaces/lab-server-output.interface';
import axios, { AxiosStatic } from 'axios';
import { AxiosOperations } from './axios-operations.class';
import * as FormData from 'form-data';
import { IConnectionLabServer } from '../interfaces/http-lab-server.interface';
import { AXIOS } from '../constants';

@Injectable()
export class AxiosLabServerService implements IConnectionLabServer {
  constructor(@Inject(AXIOS) private axios: AxiosStatic) {}
  async sendCommand(
    url_server: string,
    command: string,
  ): Promise<ILabServerOutput> {
    try {
      const response = await axios.get(url_server + command);
      return response.data;
    } catch (error) {
      AxiosOperations.handleAxiosError(error);
    }
  }

  async sendFile(
    url_server: string,
    command: string,
    file: Express.Multer.File,
  ): Promise<ILabServerOutput> {
    const formData = new FormData();
    formData.append('file', file.buffer, file.originalname);
    try {
      const response = await axios.post(url_server + command, formData, {
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
