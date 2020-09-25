import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  courses: any;
  apiUrl: any;

  constructor(private data: DataService, private rest: RestApiService) {
    this.apiUrl = environment.apiUrl;
  }

  async ngOnInit() {
    try {
      const data = await this.rest.get(`${this.apiUrl}/api/courses`);
      data['success']
        ? [(this.courses = data['courses']),(console.log(data))]
        : this.data.error('could not fetch courses');
    } catch (error) {
      this.data.error(error['message']);
    }
  }
}
