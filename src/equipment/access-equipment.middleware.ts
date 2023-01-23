import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { ICONNECTION_STRAPI } from './constants';
import { EquipmentCommandDto } from './dto/equipment-command.dto';
import { IEquipment } from './interfaces/equipment.interface';
import { IConnectionStrapi } from './interfaces/http-strapi.interface';

@Injectable()
export class AccessEquipmentMiddleware implements NestMiddleware {
  constructor(
    @Inject(ICONNECTION_STRAPI)
    private readonly connectionStrapi: IConnectionStrapi,
  ) {}

  async use(req: Request, res: Response, next: () => void) {
    const jwt = req.headers.authorization;
    const sessionId = req.params.sessionId;
    const equipment: IEquipment =
      await this.connectionStrapi.getEquipmentForConnect(sessionId, jwt);
    (req.query as unknown as EquipmentCommandDto).equipment = equipment;
    next();
  }
}
