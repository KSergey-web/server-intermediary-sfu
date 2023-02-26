import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { STRAPI_SERVER_URL } from 'src/equipment/constants';
import { UsersStrapiService } from '../users-strapi/users-strapi.service';
import { INewSessionForUserFromLdapDto } from './dto/session-for-user-from-Ltab';
import { IUpdateSessionForUserFromLdapDto } from './dto/update-session-for-user-from-ldap.dto';
import { ISession } from './interfaces/session.interface';

@Injectable()
export class SessionService {
  constructor(
    private readonly httpService: HttpService,
    private readonly usersStrapiService: UsersStrapiService,
  ) {}

  createSessionForUserFromLtab(
    dto: INewSessionForUserFromLdapDto,
    jwt: string,
  ): Observable<{ data: any }> {
    const existingUsers$ = this.usersStrapiService
      .createImportedFromLtabUsersInStrapi([dto.user], jwt)
      .pipe(
        map((res) => res[0]),
        catchError((err) => {
          return throwError(() => err);
        }),
      );
    const createSession$ = existingUsers$.pipe(
      switchMap((user) => this.createSession({ ...dto, user }, jwt)),
    );
    return createSession$;
  }

  createSession(
    newSession: Omit<ISession, 'id'>,
    jwt: string,
  ): Observable<{ data: any }> {
    const body = {
      data: newSession,
    };
    return this.httpService
      .post<{ data: Record<string, never> }>(
        STRAPI_SERVER_URL + `api/sessions`,
        body,
        { headers: { Authorization: jwt } },
      )
      .pipe(
        map((res) => res.data),
        catchError((err: AxiosError) => {
          return throwError(
            () =>
              new HttpException(err.response.data, err.response.status ?? 500),
          );
        }),
      );
  }

  updateSession(
    session: Partial<Omit<ISession, 'id'>>,
    sessionId: number,
    jwt: string,
  ): Observable<{ data: any }> {
    const body = {
      data: session,
    };
    return this.httpService
      .put<{ data: Record<string, never> }>(
        STRAPI_SERVER_URL + `api/sessions/${sessionId}`,
        body,
        { headers: { Authorization: jwt } },
      )
      .pipe(
        map((res) => res.data),
        catchError((err: AxiosError) => {
          return throwError(
            () =>
              new HttpException(err.response.data, err.response.status ?? 500),
          );
        }),
      );
  }

  updateSessionForUserFromLdap(
    dto: IUpdateSessionForUserFromLdapDto,
    sessionId: number,
    jwt: string,
  ): Observable<{ data: any }> {
    const existingUsers$ = this.usersStrapiService
      .createImportedFromLtabUsersInStrapi([dto.user], jwt)
      .pipe(map((res) => res[0]));
    const updateSession$ = existingUsers$.pipe(
      switchMap((user) => this.updateSession({ ...dto, user }, sessionId, jwt)),
    );
    return updateSession$;
  }
}
