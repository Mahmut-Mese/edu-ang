import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import {
  Router,
  ActivatedRoute,
  NavigationStart,
  NavigationEnd,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'client';
  btn = true;
  letVisible = true;
  constructor(
    private data: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (
          window.location.pathname === '/login' ||
          window.location.pathname === '/register'
        ) {
          this.letVisible = false;
          this.btn=true;
        } else {
          this.letVisible = true;
           
        }
      
      }
    });
  }

  async ngOnInit() {
    let token = localStorage.getItem('token');
    if (token) {
      this.btn = true;
    } else {
      this.btn = false;
    }
    console.log(this.btn);
  }
  logout() {
    this.data.user = {};
    localStorage.clear();
    this.router.navigate(['']);
    this.btn = false;
  }
}
