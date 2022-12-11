import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { catchError, forkJoin, map, mergeMap, Observable, of } from 'rxjs';
import { STRAPI_SERVER_URL } from 'src/equipment/constants';
import { IUser } from 'src/interfaces/user.interface';
import { UsersStrapiService } from '../users-strapi/users-strapi.service';
import { ISubgroup } from './interfaces/subgroup.interface';

@Injectable()
export class SubgroupStrapiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly usersStrapiService: UsersStrapiService,
  ) {}

  patchSubgroupByUsersFromLtab(groupId: number, users: IUser[], jwt: string) {
    const checkUsersInDb$ = of(users).pipe(
      mergeMap((q) =>
        forkJoin(
          q.map((user) =>
            this.usersStrapiService.checkUserInStrapidb(user, jwt),
          ),
        ),
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
            created: this.usersStrapiService.createUsers(
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
    const newUsersList$ = this.getSubgroup(groupId, jwt).pipe(
      mergeMap((subgroup) =>
        existingUsers$.pipe(
          map((users) => {
            const usersInSubgroup = subgroup.users.map((user) => user.id);
            const filteredUsers = users.filter(
              (user) => !usersInSubgroup.includes(user),
            );
            const allUsers = [...usersInSubgroup, ...filteredUsers];
            return allUsers;
          }),
        ),
      ),
    );
    const patchSubgroupByUsers$ = newUsersList$.pipe(
      mergeMap((users) => this.patchSubgroup(groupId, users, jwt)),
      catchError((err) => {
        console.log(err);
        const error = err.response?.data?.error;
        throw new HttpException(error, error.status ?? 500);
      }),
    );
    return patchSubgroupByUsers$;
  }

  getSubgroup(id: number, jwt: string): Observable<ISubgroup> {
    return this.httpService
      .get<{ data: ISubgroup }>(
        STRAPI_SERVER_URL +
          `api/subgroups/${id}?` +
          'populate[0]=users' +
          '&serialize=true',
        { headers: { Authorization: jwt } },
      )
      .pipe(map((res) => res.data.data));
  }

  patchSubgroup(
    subgroupId: number,
    users: number[],
    jwt: string,
  ): Observable<any> {
    return this.httpService
      .put<{ data: { id: number; attributes: any } }>(
        STRAPI_SERVER_URL + `api/subgroups/${subgroupId}` + '?serialize=true',
        { data: { users } },
        { headers: { Authorization: jwt } },
      )
      .pipe(map((res) => res.data));
  }
}
