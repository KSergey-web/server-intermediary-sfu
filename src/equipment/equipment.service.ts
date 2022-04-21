import { Inject, Injectable } from '@nestjs/common';
import { ICONNECTION_LAB_SERVER } from './constants';
import { IConnectionLabServer } from './interfaces/http-lab-server.interface';
import { ILabServerOutput } from './interfaces/lab-server-output.interface';

@Injectable()
export class EquipmentService {
  constructor(
    @Inject(ICONNECTION_LAB_SERVER)
    private readonly connectionLabServer: IConnectionLabServer,
  ) {}
  async sendCommand(
    url_server: string,
    command: string,
  ): Promise<ILabServerOutput> {
    return await this.connectionLabServer.sendCommand(url_server, command);
  }

  async sendFile(
    url_server: string,
    command: string,
    file: Express.Multer.File,
  ): Promise<ILabServerOutput> {
    return await this.connectionLabServer.sendFile(url_server, command, file);
  }
}
