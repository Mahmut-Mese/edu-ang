import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { TabsComponent } from './tabs/tabs.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DataService } from './data.service';
import { RestApiService } from './rest-api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './category/category.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CourseComponent } from './course/course.component';
import { PostCourseComponent } from './post-course/post-course.component';
import { PostCategoryComponent } from './post-category/post-category.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    TabsComponent,
    LoginComponent,
    RegisterComponent,
    CategoriesComponent,
    CategoryComponent,
    PaginationComponent,
    CourseComponent,
    PostCourseComponent,
    PostCategoryComponent,
    MyCoursesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, NgbModule],
  providers: [DataService, RestApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
