import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { Result } from 'src/app/models/result.dto';
import { CommentDto } from 'src/app/models/comment.dto';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private api = environment.apiUrl + '/comments';

  constructor(private http: HttpClient) {}

  getComments(postId: number): Observable<Result<CommentDto[]>> {
    return this.http.get<any>(this.api, {
      params: {
        postId,
      },
    });
  }
}
