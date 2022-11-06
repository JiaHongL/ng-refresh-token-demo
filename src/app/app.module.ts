import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

import { LoginComponent } from './login/login.component';

import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './pages/post/post.component';

import { TestInterceptor } from './interceptor/test.interceptor';
import { AuthInterceptor } from './interceptor/auth.interceptor';

import { testInterceptorFn } from './interceptor/test.interceptor.fn';
import { authInterceptorFn } from './interceptor/auth.interceptor.fn';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PostComponent,
    NavbarComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TestInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    // ng 15 可以寫成 function
    // provideHttpClient(withInterceptors([
    //   testInterceptorFn,
    //   authInterceptorFn
    // ])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
