import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../services/auth/auth.service';
import { UserService } from './../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    username: this.fb.control('joe'),
    password: this.fb.control('test'),
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    const params = this.form.value as { username: string; password: string };

    this.authService.login(params).subscribe({
      next: (res) => {
        window.localStorage.setItem('accessToken', res.accessToken);
        window.localStorage.setItem('refreshToken', res.refreshToken);

        this.router.navigateByUrl('home');
      },
      error: (error) => alert(error.error.message),
    });
  }

  createAccount() {
    this.userService.registerUser().subscribe({
      next: (res) => {
        alert(res.message);
      },
    });
  }

}
