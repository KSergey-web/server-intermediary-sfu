import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { forkJoin, iif, map, mergeMap, Observable, of } from 'rxjs';
import { STRAPI_SERVER_URL } from 'src/equipment/constants';
import { IUser } from 'src/interfaces/user.interface';

@Injectable()
export class UsersStrapiService {
  constructor(private readonly httpService: HttpService) {}

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

  checkUserInStrapidbByUsername(username: IUser): Observable<boolean> {
    return this.httpService
      .get<IUser[]>(
        STRAPI_SERVER_URL + 'api/users' + `?filters[username][$eq]=` + username,
      )
      .pipe(
        map(({ data }) => {
          if (!data.length) return false;
          return true;
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
              this.createUser(
                {
                  ...user,
                  password:
                    new Date().toJSON() + Math.floor(Math.random() * 100),
                },
                jwt,
              ),
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

  createImportedFromLtabUsersInStrapi(
    users: IUser[],
    jwt: string,
  ): Observable<number[]> {
    const checkUsersInDb$ = of(users).pipe(
      mergeMap((q) =>
        forkJoin(q.map((user) => this.checkUserInStrapidb(user, jwt))),
      ),
    );
    const existingUsers$ = checkUsersInDb$
      .pipe(
        mergeMap((users) => {
          const existingUsers = users.filter((users) => users.existInDb);
          const notExistingUsers = users.filter((users) => !users.existInDb);
          return forkJoin({
            existing: of(existingUsers).pipe(
              map((usersData) => usersData.map((userData) => userData.user)),
            ),
            created: this.createUsers(
              notExistingUsers.map((userData) => userData.user),
              jwt,
            ),
          });
        }),
      )
      .pipe(
        map((res) => [
          ...res.created.map((user) => user.id),
          ...res.existing.map((user) => user.id),
        ]),
      );
    return existingUsers$;
  }
}
