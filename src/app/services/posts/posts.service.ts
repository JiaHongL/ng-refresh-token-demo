import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { Result } from 'src/app/models/result.dto';
import { PostItemDto } from './../../models/post-item.dto';
import { PostItemDetailDto } from './../../models/post-item-detail.dto';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private api = environment.apiUrl + '/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Result<PostItemDto[]>> {
    return this.http.get<any>(this.api);
  }

  getPostDetail(postId: string): Observable<Result<PostItemDetailDto>> {
    return this.http.get<any>(this.api + '/' + postId);
  }
}
