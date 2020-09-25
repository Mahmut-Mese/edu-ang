import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { environment } from '../../environments/environment';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = '';
  password: '';
  apiUrl: any;

  constructor(
    private router: Router,
    private data: DataService,
    private rest: RestApiService
  ) {
    this.apiUrl = environment.apiUrl;
  }

  ngOnInit(): void {}
  validate() {
    if (this.email) {
      if (this.password) {
        return true;
      } else {
        this.data.error('password is required');
        console.log('password is required');
      }
    } else {
      this.data.error('email is required');
      console.log('email is required');
    }
  }
  async login() {
   
    try {
      if (this.validate()) {
        const data = await this.rest.post(
          `${this.apiUrl}/api/accounts/login`,
          { email: this.email, password: this.password }
        );
        if (data['success']) {
         
          this.data.btn=true;
          localStorage.setItem('token', data['token']);
     
          this.router.navigate(['/profile'])
        }else{
          console.log("error")
        }
      }
    } catch (error) {
      this.data.error(error['message']);
    }
  }
}
