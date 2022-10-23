import { Router } from '@angular/router';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './../../services/categories/categories.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  categories: string[] = [];

  profile: {
    userId?: number;
    username?: string;
    avatar?: string;
  } = {};

  constructor(
    private categoriesService: CategoriesService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
    });

    this.userService.getProfile().subscribe({
      next: (res) => {
        this.profile = res.data;
      },
    });
  }

  logout(): void {
    window.localStorage.clear();
    this.router.navigateByUrl('login');
  }

  deleteAccount(): void {
    this.userService.deleteUser().subscribe({
      next: (res) => {
        alert(res.message);
      },
    });
  }
}
