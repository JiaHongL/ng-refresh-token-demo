import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api = environment.apiUrl + '/user';

  constructor(private http: HttpClient) {}

  registerUser() {
    return this.http.post<any>(this.api + '/register', {});
  }

  deleteUser() {
    return this.http.post<any>(this.api + '/delete', {});
  }

  getProfile() {
    return this.http.get<any>(this.api + '/profile');
  }
}
