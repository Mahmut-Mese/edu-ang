import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './category/category.component';
import { CourseComponent } from './course/course.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardService] },
  { path: 'categories', component: CategoriesComponent },
  { path: 'categories/:id', component: CategoryComponent },
  { path: 'course/:id', component: CourseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
