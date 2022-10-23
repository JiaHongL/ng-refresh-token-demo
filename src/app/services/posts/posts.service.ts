import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private api = environment.apiUrl + '/posts';

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<any>(this.api);
  }

  getPostsDetail(postId: string) {
    return this.http.get<any>(this.api + '/' + postId);
  }

}
