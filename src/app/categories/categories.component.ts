import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: any;
  newCategory: '';
  apiUrl: any;

  constructor(private rest: RestApiService, private data: DataService) {
    this.apiUrl = environment.apiUrl;

  }

  async ngOnInit() {
    try {
      const data = await this.rest.get(`${this.apiUrl}/api/categories`);
      data['success']
        ? (this.categories = data['categories'])
        : this.data.error(data['message']);
    } catch (error) {
      this.data.error(error['message']);
    }
  }
  async addCategory() {
    try {
      const data = await this.rest.post(
        `${this.apiUrl}/api/categories`,
        { category: this.newCategory }
      );
      data['success']
        ? this.data.success(data['message'])
        : this.data.error(data['message']);
    } catch (error) {
      this.data.error(error['message']);
    }
  }
}
