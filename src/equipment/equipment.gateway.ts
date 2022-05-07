import { Inject, Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ICONNECTION_STRAPI } from './constants';
import { IEquipment } from './interfaces/equipment.interface';
import { IConnectionStrapi } from './interfaces/http-strapi.interface';
import { ILabServerOutput } from './interfaces/lab-server-output.interface';
import { IUser } from './interfaces/user.interface';

@WebSocketGateway({
  namespace: 'equipment',
    cors: {
      origin: ["http://localhost:4200"]
    }
})
export class EquipmentGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @Inject(ICONNECTION_STRAPI)
    private readonly connectionStapi: IConnectionStrapi,
  ) {}
  private logger: Logger = new Logger('SocketGateway');

  @WebSocketServer()
  private server: Server;

  handleDisconnect(client: Socket) {
    this.logger.log(client.id);
  }

  sendOutputToUsers(sessionId: string, output: ILabServerOutput) {
    this.server.to(sessionId).emit('output', output);
  }

  handleConnection(client: Socket, ...args: any[]) {
    const sessionId = (client.request as any).sessionId;
    client.join(`${sessionId}`);
    this.logger.log(client.id);
  }

  private setAuthMiddleware(server: Server) {
    server.use(async (socket, next) => {
      const jwt = socket.handshake.auth?.token;
      const sessionId = socket.handshake.auth?.sessionId;
      this.logger.log(socket.handshake.auth);
      try {
        await this.connectionStapi.getEquipmentForConnect(sessionId, jwt);
        (socket.request as any).sessionId = sessionId;
        next();
      } catch (err) {
        next(new Error('session unavailable'));
      }
    });
  }

  afterInit(server: Server) {
    this.setAuthMiddleware(server);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
