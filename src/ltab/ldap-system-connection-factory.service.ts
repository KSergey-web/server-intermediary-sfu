import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'ldapts';
import { LTAB_SERVER_URL } from 'src/equipment/constants';

@Injectable()
export class LdapSystemConnectionFactory {
  private readonly SYSTEM_DN_LTAB: string =
    this.configService.get<string>('SYSTEM_DN_LTAB');
  private readonly SYSTEM_PASSWORD_LTAB: string =
    this.configService.get<string>('SYSTEM_PASSWORD_LTAB');

  constructor(private configService: ConfigService) {}

  private async systemBind(client: Client) {
    await client.bind(this.SYSTEM_DN_LTAB, this.SYSTEM_PASSWORD_LTAB);
  }

  async createSystemConnection(): Promise<Client> {
    const systemClient = new Client({
      url: LTAB_SERVER_URL,
    });
    try {
      await this.systemBind(systemClient);
      return systemClient;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        { message: `some error in creating ltab connection: Error: ${err}` },
        500,
      );
    }
  }

  async createClient() {
    const client = new Client({
      url: LTAB_SERVER_URL,
    });
    return client;
  }
}
