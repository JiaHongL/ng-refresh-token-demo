import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private api = environment.apiUrl + '/comments';

  constructor(private http: HttpClient) {}

  getComments(postId: number) {
    return this.http.get<any>(this.api, {
      params: {
        postId,
      },
    });
  }
}
