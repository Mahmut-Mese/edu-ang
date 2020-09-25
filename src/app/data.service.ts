import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  message = '';
  messageType = 'danger';
  user: any;
  btn = false;

  constructor(private router: Router, private rest: RestApiService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.message = '';
      }
    });
  }
  error(message) {
    this.messageType = 'error';
    this.message = message;
  }
  success(message) {
    this.messageType = 'success';
    this.message = message;
  }
  warning(message) {
    this.messageType = 'danger';
    this.message = message;
  }

}
