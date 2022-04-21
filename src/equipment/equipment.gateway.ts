import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AxiosOperations } from './axios-operations.class';
import { IUser } from './interfaces/user.interface';


@WebSocketGateway({
namespace: 'equipment',
})
export class EquipmentGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private logger: Logger = new Logger('SocketGateway');

  @WebSocketServer()
  server: Server;

  handleDisconnect(client: Socket) {
    this.logger.log((client.request as any).user);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log((client.request as any).user);
  }

  private setAuthMiddleware(server: Server){
    server.use(async (socket, next) => {
      const token = socket.handshake.auth?.token;
      this.logger.log(socket.handshake.auth)
      const user: IUser| null = await AxiosOperations.whoAmI(token);
      if (user) {
        (socket.request as any).user = user;
        next();
      } else {
        next(new Error('unauthorized'))
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
