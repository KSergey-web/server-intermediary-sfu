import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AXIOS, STRAPI_SERVER_URL } from '../constants';
import { IEquipment } from '../interfaces/equipment.interface';
import { IUser } from '../interfaces/user.interface';
import { AxiosOperations } from './axios-operations.class';
import axios, { AxiosStatic } from 'axios';
import { IConnectionStrapi } from '../interfaces/http-strapi.interface';

@Injectable()
export class AxiosStrapiService implements IConnectionStrapi {
  constructor(@Inject(AXIOS) private axios: AxiosStatic) {}
  async whoAmI(jwt: string): Promise<IUser> {
    if (!jwt) throw new UnauthorizedException('JWT is incorrect');
    const instance = axios.create({
      baseURL: STRAPI_SERVER_URL,
    });
    instance.defaults.headers.common['Authorization'] = jwt;
    try {
      const response = await instance.get('/api/users/me');
      return response.data;
    } catch (err) {
      AxiosOperations.handleAxiosError(err);
    }
  }

  async canAccessToSession(
    sessionId: string | number,
    jwt: string,
  ): Promise<IEquipment> {
    const axiosInstance = AxiosOperations.initReqWithJwt(
      STRAPI_SERVER_URL,
      jwt,
    );
    sessionId = parseInt(sessionId as any);
    let equipment: IEquipment;
    try {
      const response = await axiosInstance.get(
        `api/sessions/${sessionId}/canConnect`,
      );
      equipment = response.data.equipment;
    } catch (error) {
      AxiosOperations.handleAxiosError(error);
    }
    if (!equipment) throw new ForbiddenException('Equipment is undefined');
    return equipment;
  }
}
