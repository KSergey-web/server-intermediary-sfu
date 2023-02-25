import { Inject, Logger, UseFilters } from '@nestjs/common';
import {
  BaseWsExceptionFilter,
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ICONNECTION_STRAPI } from './constants';
import { EquipmentService } from './equipment.service';
import { IEquipment } from './interfaces/equipment.interface';
import { IConnectionStrapi } from './interfaces/http-strapi.interface';
import { ILabServerOutput } from './interfaces/lab-server-output.interface';

@WebSocketGateway({
  namespace: 'equipment',
  cors: {
    origin: ['http://localhost:4200', 'http://10.3.3.20:4200'],
  },
})
export class EquipmentGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @Inject(ICONNECTION_STRAPI)
    private readonly connectionStapi: IConnectionStrapi,
    private readonly equipmentService: EquipmentService,
  ) {}
  private logger: Logger = new Logger('SocketGateway');

  private socketInfoMap = new WeakMap<
    Socket,
    { equipment: IEquipment; sessionId: string }
  >();

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
    this.logger.log(`client ${client.id} connected to ${sessionId}`);
  }

  private setAuthMiddleware(server: Server) {
    server.use(async (socket, next) => {
      const jwt = socket.handshake.auth?.token;
      const sessionId: string = socket.handshake.auth?.sessionId + '';
      try {
        const equipment = await this.connectionStapi.getEquipmentForConnect(
          sessionId,
          jwt,
        );
        this.socketInfoMap.set(socket, { equipment, sessionId });
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

  @UseFilters(BaseWsExceptionFilter)
  @SubscribeMessage('send-command')
  async sendCommand(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { command: string },
  ): Promise<any> {
    const { equipment, sessionId } = this.socketInfoMap.get(client);
    const res = await this.equipmentService.sendCommand(
      equipment.server_url + '/' + equipment.type,
      payload.command,
      equipment,
    );

    this.sendOutputToUsers(sessionId, res);
    return res;
  }
}
