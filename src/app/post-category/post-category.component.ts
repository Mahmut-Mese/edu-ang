import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.scss']
})
export class PostCategoryComponent implements OnInit {
  category = {
    title: '',
    description: '',
    category_picture: null,
  };
  imgURL: any;
  public imagePath;
  apiUrl: any;
  uploading = false;

  constructor(
    private rest: RestApiService,
    private data: DataService,
    private router: Router
  ) {
    this.apiUrl = environment.apiUrl;
  }
 
    ngOnInit():void {
   
  }
  preview(files) {
    this.category.category_picture = files[0];
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
    for (const key in this.category) {
      if (this.category.hasOwnProperty(key)) {
        if (key === 'category_picture') {
          form.append(
            'category_picture',
            this.category.category_picture,
            this.category.category_picture.name
          );
        } else {
          form.append(key, this.category[key]);
        }
      }
    }
    const data = await this.rest.post(
      `${this.apiUrl}/api/categories`,
      form
    );

    data['success']
      ? this.router.navigate(['categories'])
      : console.log('olmadı');
  }
}
