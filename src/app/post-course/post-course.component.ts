import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-post-course',
  templateUrl: './post-course.component.html',
  styleUrls: ['./post-course.component.scss'],
})
export class PostCourseComponent implements OnInit {
  course = {
    title: '',
    price: 0,
    categoryId: '',
    description: '',
    course_picture: null,
  };
  imgURL: any;
  apiUrl: any;
  uploading = false;
  public imagePath;
  constructor(
    private rest: RestApiService,
    private data: DataService,
    private router: Router
  ) {  this.apiUrl = environment.apiUrl;}
  categories: any;
  async ngOnInit() {
    try {
      const data = await this.rest.get(`${this.apiUrl}/api/categories`);
      data['success']
        ? [(this.categories = data['categories']),(console.log(this.categories))]
        : this.data.error(data['message']);
    } catch (error) {
      this.data.error(error['message']);
    }
  }
  preview(files) {
    this.course.course_picture = files[0];
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = 'Only images are supported.';
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }
  async post() {
    this.uploading = true;
    const form = new FormData();
    for (const key in this.course) {
      if (this.course.hasOwnProperty(key)) {
        if (key === 'course_picture') {
          form.append(
            'course_picture',
            this.course.course_picture,
            this.course.course_picture.name
          );
        } else {
          form.append(key, this.course[key]);
        }
      }
    }
    const data = await this.rest.post(
      `${this.apiUrl}/api/seller/courses`,
      form
    );

    data['success']
      ? this.router.navigate([`categories`])
      : console.log('olmadı');
  }
}
