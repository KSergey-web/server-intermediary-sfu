import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { forkJoin, iif, map, mergeMap, Observable, of } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { STRAPI_SERVER_URL } from 'src/equipment/constants';
import { IUser } from 'src/interfaces/user.interface';

@Injectable()
export class UsersStrapiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly authService: AuthService,
  ) {}

  checkUserInStrapidb(
    user: IUser,
    jwt: string,
  ): Observable<{ user: IUser; existInDb: boolean }> {
    return this.httpService
      .get<IUser[]>(
        STRAPI_SERVER_URL +
          'api/users' +
          `?filters[username][$eq]=` +
          user.username,
        { headers: { Authorization: jwt } },
      )
      .pipe(
        map(({ data }) => {
          if (!data.length) return { user, existInDb: false };
          return { user: data[0], existInDb: true };
        }),
      );
  }

  createUsers(users: IUser[], jwt: string): Observable<IUser[]> {
    return of(users).pipe(
      mergeMap((users) =>
        iif(
          () => !!users.length,
          forkJoin(
            users.map((user) =>
              this.createUser({ ...user, password: '1234ab' }, jwt),
            ),
          ),
          of([]),
        ),
      ),
    );
  }

  createUser(
    user: IUser & { password: string },
    jwt: string,
  ): Observable<IUser> {
    return this.httpService
      .post<IUser>(STRAPI_SERVER_URL + 'api/users', user, {
        headers: { Authorization: jwt },
      })
      .pipe(map((res) => res.data));
  }
}
