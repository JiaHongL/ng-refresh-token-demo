import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth/auth.service';

import {
  BehaviorSubject,
  catchError,
  EMPTY,
  filter,
  switchMap,
  take,
  throwError,
} from 'rxjs';

let isRefreshing = false;

let refreshTokenSubject = new BehaviorSubject<any>(null);

export function authInterceptorFn(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) {

  const authService = inject(AuthService);

  const router = inject(Router);

  const accessToken = window.localStorage.getItem('accessToken');

  let addTokenHeader = (request: HttpRequest<any>, token: string) => {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
  };

  let logout = () => {
    window.localStorage.clear();
    router.navigateByUrl('/login');
  };

  let handle401Error = (request: HttpRequest<any>, next: HttpHandlerFn) => {

    if (!isRefreshing) {

      isRefreshing = true;
      refreshTokenSubject.next(null);

      const accessToken = window.localStorage.getItem('accessToken');
      const refreshToken = window.localStorage.getItem('refreshToken');

      if (accessToken && refreshToken) {
        return authService.refreshToken(refreshToken).pipe(
          switchMap((res: any) => {

            isRefreshing = false;

            const newAccessToken = res.data.accessToken;
            const newRefreshToken = res.data.refreshToken;

            window.localStorage.setItem('accessToken', newAccessToken);
            window.localStorage.setItem('refreshToken', newRefreshToken);

            refreshTokenSubject.next(newAccessToken);

            return next(addTokenHeader(request, newAccessToken));

          }),
          catchError((error: any) => {

            isRefreshing = false;

            alert(error.error.message);

            return throwError(() => error);

          })
        );
      }
    }

    return refreshTokenSubject.pipe(
      filter((token: string) => token !== null),
      take(1),
      switchMap((token) => next(addTokenHeader(request, token)))
    );

  };

  if (accessToken) {
    request = addTokenHeader(request, accessToken);
  }

  return next(request).pipe(
    catchError((error) => {

      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        !request.url.includes('/login') &&
        !request.url.includes('/auth/refreshToken')
      ) {
        return handle401Error(request, next);
      }

      if (error instanceof HttpErrorResponse && error.status === 403) {
        logout();
        return EMPTY;
      }

      return throwError(() => error);

    })
  );

}
