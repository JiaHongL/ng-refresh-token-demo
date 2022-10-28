import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CommentsService } from '../../services/comments/comments.service';
import { PostsService } from '../../services/posts/posts.service';

import { PostItemDetailDto } from 'src/app/models/post-item-detail.dto';
import { CommentDto } from './../../models/comment.dto';

import { mergeMap } from 'rxjs';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  post!:PostItemDetailDto;

  comments:CommentDto[] = [];

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;

    this.postsService
      .getPostDetail(id)
      .pipe(
        mergeMap((res) => {
          this.post = res.data;
          return this.commentsService.getComments(this.post.postId!);
        })
      )
      .subscribe({
        next: (res) => {
          this.comments = res.data;
        },
      });
  }
}
