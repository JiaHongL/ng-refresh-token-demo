import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { Result } from './../../models/result.dto';
import { TokensDto } from './../../models/tokens.dto';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) {}

  login(params: {
    username: string;
    password: string;
  }): Observable<Result<TokensDto>> {
    return this.http.post<any>(this.api + '/login', params);
  }

  refreshToken(refreshToken: string): Observable<Result<TokensDto>> {
    return this.http.post<any>(this.api + '/refreshToken', {
      refreshToken,
    });
  }
}
