import {
    HttpException,
    HttpStatus,
    UnauthorizedException,
} from '@nestjs/common';
import { AxiosInstance, AxiosStatic } from 'axios';
import { STRAPI_SERVER_URL } from './constants';
import { Request } from 'express';
import axios from 'axios';
import { IUser } from './interfaces/user.interface';

export class AxiosOperations {
    static initReqToStrapiWithJwt(
        req: Request,
        axios: AxiosStatic,
    ): AxiosInstance {
        const jwt = req.headers.authorization;
        //const jwt =
        //  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjUwMzUyOTc1LCJleHAiOjE2NTI5NDQ5NzV9.I5nva2CSYE-g845d_dPiO6h4q5MyLJz7N7Lb9Q-dCB4';
        if (!jwt) throw new UnauthorizedException();
        const instance = axios.create({
            baseURL: STRAPI_SERVER_URL,
        });
        instance.defaults.headers.common['Authorization'] = jwt;
        return instance;
    }

    static handleAxiosError(error): unknown {
        const response = error.response;
        if (response)
            throw new HttpException(response?.data?.message, response?.status ?? 500);
        throw new HttpException(
            'it seems the server is not available',
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }

    static async whoAmI(jwt: string): Promise<IUser | null> {
        if (!jwt) return null;
        const instance = axios.create({
            baseURL: STRAPI_SERVER_URL,
        });
        instance.defaults.headers.common['Authorization'] = jwt;
        try{
            const response = await instance.get('/api/users/me');
            return response.data as IUser;
        } catch(err){
            return null;
        }
    }
}
