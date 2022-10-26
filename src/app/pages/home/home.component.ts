import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PostsService } from './../../services/posts/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  postList: {
    title: string;
    body: string;
    id: number;
    tag: string[];
    cover: string;
    user: {
      id: number;
      username: string;
      avatar: string;
    };
  }[] = [];

  constructor(private postsService: PostsService, private router: Router) {}

  ngOnInit(): void {
    this.postsService.getPosts().subscribe({
      next: (res) => {
        this.postList = res.data;
      },
    });
  }

  goToDetail(id: number) {
    this.router.navigate(['post', id]);
  }
}
