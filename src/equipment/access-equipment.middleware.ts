import {
  ForbiddenException,
  Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { AxiosStatic } from 'axios';
import { AXIOS } from './constants';
import { Request, Response } from 'express';
import { IEquipment } from './interfaces/equipment.interface';
import { AxiosOperations } from './axios-operations.class';

@Injectable()
export class AccessEquipmentMiddleware implements NestMiddleware {
  constructor(@Inject(AXIOS) private axios: AxiosStatic) {}
  async use(req: Request, res: Response, next: () => void) {
    const axiosInstance = AxiosOperations.initReqToStrapiWithJwt(
      req,
      this.axios,
    );
    const sessionId = parseInt(req.params.sessionId);
    let equipment: IEquipment;
    try {
      const response = await axiosInstance.get(
        `api/sessions/${sessionId}/canConnect`,
      );
      equipment = response.data.equipment;
    } catch (error) {
      AxiosOperations.handleAxiosError(error);
    }
    if (!equipment) throw new ForbiddenException();
    req.query.server_url = equipment.server_url;
    next();
  }
}
