import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  course: any;
  apiUrl: any;

  constructor(
    private data: DataService,
    private rest: RestApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.apiUrl = environment.apiUrl;
  }

  ngOnInit() {
    console.log( window.location.hostname);

    this.activatedRoute.params.subscribe((res) => {
      this.rest
        .get(`${this.apiUrl}/api/course/${res['id']}`)
        .then((data) => {
          data['success']
            ? (this.course = data['course'])
            : this.router.navigate(['/']);
        })
        .catch((error) => this.data.error(error['message']));
    });
  }
}
