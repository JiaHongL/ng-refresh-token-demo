import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) {}

  login(params: { username: string; password: string }) {
    return this.http.post<any>(this.api + '/login', params);
  }

  refreshToken(refreshToken: string) {
    return this.http.post<any>(this.api + '/refreshToken', {
      refreshToken,
    });
  }
}
