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

    return next.handle(request).pipe(
      catchError((error) => {

        if (
          error instanceof HttpErrorResponse &&
          !request.url.includes('/login') &&
          error.status === 401
        ) {
          return this.handle401Error(request, next);
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
      const refreshToken = window.localStorage.getItem('refreshToken');

      if (accessToken && refreshToken) {

        return this.authService.refreshToken(refreshToken).pipe(
          switchMap((res: any) => {

            this.isRefreshing = false;

            window.localStorage.setItem('accessToken', res.accessToken);
            window.localStorage.setItem('refreshToken', res.refreshToken);

            this.refreshTokenSubject.next(res.accessToken);

            return next.handle(this.addTokenHeader(request, res.accessToken));

          }),
          catchError((error: any) => {

            this.isRefreshing = false;

            if (error.status === 403) {
              this.handle403Error();
            }

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

  private handle403Error() {
    window.localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
  }

}
