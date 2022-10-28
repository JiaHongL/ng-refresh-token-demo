import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { Result } from 'src/app/models/result.dto';
import { CommentDto } from 'src/app/models/comment.dto';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private api = environment.apiUrl + '/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Result<string[]>> {
    return this.http.get<any>(this.api);
  }
}
