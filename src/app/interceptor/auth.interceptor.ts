import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';

import { AuthService } from './../services/auth/auth.service';

import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  isRefreshing = false;

  private refreshTokenSubject = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    const accessToken = window.localStorage.getItem('accessToken');

    if (accessToken) {
      request = this.addTokenHeader(request, accessToken);
    }

    return next.handle(request)
    .pipe(
      catchError((error) => {
        console.log('error',error);
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          !request.url.includes('/login') &&
          !request.url.includes('/auth/refreshToken')
        ) {
          return this.handle401Error(request, next);
        }

        if (
          error instanceof HttpErrorResponse &&
          error.status === 403
        ) {
          this.logout();
        }

        return throwError(() => error);

      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

    if (!this.isRefreshing) {

      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const accessToken = window.localStorage.getItem('accessToken');
      const refreshToken = window.localStorage.getItem('refreshToken') ;

      if (accessToken && refreshToken) {

        return this.authService.refreshToken(refreshToken).pipe(
          switchMap((res: any) => {

            this.isRefreshing = false;

            const newAccessToken = res.data.accessToken;
            const newRefreshToken = res.data.refreshToken;

            window.localStorage.setItem('accessToken', newAccessToken);
            window.localStorage.setItem('refreshToken', newRefreshToken);

            this.refreshTokenSubject.next(newAccessToken);

            return next.handle(this.addTokenHeader(request, newAccessToken));

          }),
          catchError((error: any) => {

            this.isRefreshing = false;

            alert(error.error.message);

            return throwError(() => error);

          })
        );

      }

    }

    return this.refreshTokenSubject.pipe(
      filter((token: string) => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );

  }

  private logout() {
    window.localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
  }

}
