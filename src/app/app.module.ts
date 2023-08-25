import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './header/login/login.component';
import { TableComponent } from './table/table.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PostComponent } from './table/post/post.component';
import { RouterModule, Routes } from '@angular/router';
import { InfoPageComponent } from './table/info-page/info-page.component';
import { PostColorDirective } from './table/directives/post-color.directive';
import { authGuard } from './table/guards/auth.guard';
import { FormsModule } from '@angular/forms';
import { SharedInterceptorInterceptor } from './shared/shared-interceptor.interceptor';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/posts',
  },
  {
    path: 'posts',
    component: TableComponent,
    canActivate: [authGuard],
  },
  {
    path: 'posts/info/:id',
    component: InfoPageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/posts',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    PostComponent,
    InfoPageComponent,
    PostColorDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HeaderModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SharedInterceptorInterceptor,
      multi: true,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
