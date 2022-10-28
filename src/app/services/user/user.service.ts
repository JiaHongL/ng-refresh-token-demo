import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { Result } from 'src/app/models/result.dto';
import { UserInfoDto } from './../../models/user-info.dto';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api = environment.apiUrl + '/user';

  constructor(private http: HttpClient) {}

  registerUser(): Observable<Result<any>> {
    return this.http.post<any>(this.api + '/register', {});
  }

  deleteUser(): Observable<Result<any>> {
    return this.http.post<any>(this.api + '/delete', {});
  }

  getProfile(): Observable<Result<UserInfoDto>> {
    return this.http.get<any>(this.api + '/profile');
  }
}
