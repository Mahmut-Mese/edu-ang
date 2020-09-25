import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  password1 = '';
  btnDisabled = false;
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
    if (this.name) {
      if (this.email) {
        if (this.password) {
          if (this.password1) {
            if (this.password === this.password1) {
              console.log('true');
              return true;
            } else {
              this.data.error('password is not same ');
              console.log('password is not same');
            }
          } else {
            this.data.error('confirmation password is required');
            console.log('confirmation password is required');
          }
        } else {
          this.data.error('password is required');
          console.log('password is required');
        }
      } else {
        this.data.error('email is required');
        console.log('email is required');
      }
    } else {
      this.data.error('name is required');
      console.log('name is required');
    }
  }
  async register() {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        const data = await this.rest.post(
          `${this.apiUrl}/api/accounts/signup`,
          { name: this.name, email: this.email, password: this.password }
        );
        if (data['success']) {
          localStorage.setItem('token', data['token']);
          this.router.navigate(['/profile']);
        } else {
          this.data.error(data['message']);
        }
      }
    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }
}
