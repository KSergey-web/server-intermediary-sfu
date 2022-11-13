import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { STRAPI_SERVER_URL } from 'src/equipment/constants';
import { IUser } from 'src/interfaces/user.interface';
import { LdapAuthService } from 'src/ltab/ldap-auth.service';
import { LoginDTO } from './dto/login-dto.class';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly ltabAuthService: LdapAuthService,
  ) {}

  async login(dto: LoginDTO): Promise<{ user: IUser; jwt: string }> {
    const auth$ = this.httpService
      .post(STRAPI_SERVER_URL + 'api/auth/local', dto)
      .pipe(map((res) => res.data as { user: IUser; jwt: string }));
    let authData;
    try {
      authData = await lastValueFrom(auth$);
    } catch (err) {
      if (err.response.status == 400) {
        const user = await this.ltabAuthService.authWithLtab(dto);
        return await this.registr(user, dto.password);
      }
      throw err;
    }
    return authData;
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
    try {
      const authData = await lastValueFrom(registr$);
    } catch (err) {
      throw new HttpException({ message: err.response.message }, 500);
    }
    return authData;
  }
}
