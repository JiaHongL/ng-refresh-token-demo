import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private api = environment.apiUrl + '/categories';

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<any>(this.api);
  }
}
