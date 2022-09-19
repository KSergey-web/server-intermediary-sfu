import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'ldapts';
import { ICONNECTION_LAB_SERVER } from './constants';
import { IConnectionLabServer } from './interfaces/http-lab-server.interface';
import { ILabServerOutput } from './interfaces/lab-server-output.interface';

@Injectable()
export class EquipmentService {
  constructor(
    @Inject(ICONNECTION_LAB_SERVER)
    private readonly connectionLabServer: IConnectionLabServer,
  ) {
    this.tryLdap();
  }
  async sendCommand(
    url_server: string,
    command: string,
  ): Promise<ILabServerOutput> {
    return await this.connectionLabServer.sendCommand(url_server, command);
  }

  async tryLdap() {
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
      console.log(ex);
    } finally {
      console.log(isAuthenticated);
      await client.unbind();
    }
  }

  async sendFile(
    url_server: string,
    command: string,
    file: Express.Multer.File,
  ): Promise<ILabServerOutput> {
    return await this.connectionLabServer.sendFile(url_server, command, file);
  }
}
