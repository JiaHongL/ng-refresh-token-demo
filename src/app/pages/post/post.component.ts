import { CommentsService } from '../../services/comments/comments.service';
import { PostsService } from '../../services/posts/posts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  post: {
    body?: string;
    cover?: string;
    id?: number;
    postId?: number;
    reactions?: number;
    tags?: string[];
    title?: string;
    user?: {
      id: number;
      username: string;
      avatar: string;
    };
    userId?: number;
  } = {};

  comments:{
    id?: number;
    postId?:number;
    body?:string;
    user?: {
      id: number;
      username: string;
      avatar: string;
    };
  }[] = [];

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
