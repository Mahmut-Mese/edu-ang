import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss'],
})
export class MyCoursesComponent implements OnInit {
  courses: any;
  apiUrl: any;


  constructor(private data: DataService, private rest: RestApiService) {
    this.apiUrl = environment.apiUrl;
  }

  async ngOnInit() {
    try {
      const data = await this.rest.get(
        `${this.apiUrl}/api/seller/courses`
      );
      data['success']
        ? (this.courses = data['courses'])
        : this.data.error(data['message']);
    } catch (error) {
      this.data.error(error['message']);
    }
  }
}
