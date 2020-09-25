import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categoryId: any;
  category: any;
  page = 1;
  apiUrl: any;
  constructor(
    private data: DataService,
    private rest: RestApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.apiUrl = environment.apiUrl;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((res) => {
      this.categoryId = res['id'];
      this.getCourses();
    });
  }
  get lower() {
    return 10 * (this.page - 1) + 1;
  }
  get upper() {
    return Math.min(10 * this.page, this.category.totalCourses);
  }
  async getCourses(event?: any) {
    if (event) {
      this.category = null;
    }
    try {
      const data = await this.rest.get(
        `${this.apiUrl}/api/categories/${this.categoryId}?page=${
          this.page - 1
        }`
      );
      data['success']
        ? (this.category = data)
        : this.data.error(data['message']);
    } catch (error) {
      this.data.error(error['message']);
    }
  }
}
