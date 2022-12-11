import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, lastValueFrom, map, tap } from 'rxjs';
import { STRAPI_SERVER_URL } from 'src/equipment/constants';
import { IUser } from 'src/interfaces/user.interface';
import { LdapAuthService } from 'src/ltab/ldap-auth.service';
import { UsersStrapiService } from 'src/strapi/users-strapi/users-strapi.service';
import { LoginDTO } from './dto/login-dto.class';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly ltabAuthService: LdapAuthService,
    private configService: ConfigService,
    private usersStrapiService: UsersStrapiService,
  ) {}

  async login(dto: LoginDTO): Promise<{ user: IUser; jwt: string }> {
    const auth$ = this.httpService
      .post(STRAPI_SERVER_URL + 'api/auth/local', dto)
      .pipe(
        catchError((err) => {
          const error = err.response?.data?.error;
          throw new HttpException(error, error?.status ?? 500);
        }),
      )
      .pipe(map((res) => res.data as { user: IUser; jwt: string }));
    let authData;
    try {
      authData = await lastValueFrom(auth$);
    } catch (err) {
      if (err.response?.status == 400) {
        const user = await this.ltabAuthService.authWithLtab(dto);
        const info = await lastValueFrom(
          this.usersStrapiService.checkUserInStrapidb(
            { username: dto.identifier } as IUser,
            this.configService.get<string>('ROOT_KEY'),
          ),
        );
        if (info.existInDb) {
          await this.updateUserData(
            { ...user, password: dto.password } as IUser,
            info.user.id!,
          );
          return await lastValueFrom(
            this.httpService
              .post(STRAPI_SERVER_URL + 'api/auth/local', dto)
              .pipe(map((res) => res.data as { user: IUser; jwt: string })),
          );
        } else {
          return await this.registr(user, dto.password);
        }
      }

      throw err;
    }
    return authData;
  }

  async updateUserData(user: Partial<IUser>, id: number): Promise<any> {
    const req$ = this.httpService.put(
      STRAPI_SERVER_URL + 'api/users/' + id,
      user,
      {
        headers: {
          Authorization: this.configService.get<string>('ROOT_KEY'),
        },
      },
    );
    return await lastValueFrom(req$);
  }

  async registr(user: IUser, password): Promise<{ user: IUser; jwt: string }> {
    console.log(user);
    const registr$ = this.httpService
      .post(STRAPI_SERVER_URL + 'api/auth/local/register', {
        ...user,
        password,
      })
      .pipe(map((res) => res.data as { user: IUser; jwt: string }));
    let authData;
    authData = await lastValueFrom(registr$);
    return authData;
  }
}
