import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, AfterViewInit {
  name = '';
  email = '';
  psd = '';
  psd1 = '';
  addr1 = '';
  user: any;
  currentAddress: any;
  defaultImg = 'assets/img/avatars/home-profile.jpg';
  imgUrl: any;
  public imagePath;
  imgURL: any;
  public message: string;
  submitVisible = false;
  uploading = false;
  apiUrl: any;

  constructor(private data: DataService, private rest: RestApiService) {
    this.apiUrl = environment.apiUrl;
  }

  ngOnInit() {
    /*    try {
      const res =  this.rest.get(
        '${this.apiUrl}/api/accounts/address'
      );
      if (
        JSON.stringify(res['address']) === '{}' &&
        this.data.message === ''
      ) {
        this.data.warning('you dont have adderess');
        this.currentAddress.addr1='';
        this.currentAddress.state=''
      }
      this.currentAddress = res['address'];
      console.log(res);
      console.log(this.currentAddress);
      this.currentAddress = Object.assign({
        addr1: '',
      });
      console.log(this.currentAddress);
    } catch (error) {
      this.data.error(error['message']);
    } */
    this.getAddress();
    this.getProfile();
    console.log(this.user)
  }
  ngAfterViewInit() {
    // this.user=this.data.user;
  }
  async getProfile() {
  
    try {
      if (localStorage.getItem('token')) {
        const data = await this.rest.get(
          `${this.apiUrl}/api/accounts/profile`
        );
        this.user = data['user'];
        console.log(this.user);
      }
    } catch (error) {
      //    this.error(error);
    }
  }
  async getAddress() {
    try {
      if (localStorage.getItem('token')) {
        const data = await this.rest.get(
          `${this.apiUrl}/api/accounts/address`
        );
        this.currentAddress = data['address'];

        console.log(this.currentAddress);
      }
    } catch (error) {
      // this.error(error);
    }
  }

  validate(user) {
    if (user['name']) {
      if (user['email']) {
        if (this.psd) {
          if (this.psd1) {
            if (this.psd === this.psd1) {
              return true;
            } else {
              this.data.error('authenticated not confirmed');
            }
          } else {
            this.data.error('please confirm your password');
          }
        } else {
          this.data.error('please write your password');
        }
      } else {
        this.data.error('please write your email');
      }
    } else {
      this.data.error('please write your name');
    }
  }
  async updateSettings() {
    if (this.validate(this.data.user)) {
      const data = await this.rest.post(
        '${this.apiUrl}/api/accounts/profile',
        {
          name: this.user.name,
          email: this.user.email,
          password: this.psd,
        }
      );
      data['success'] ? this.getProfile() : console.log('error3');
    }
  }

  async updateAddress() {
    console.log(this.data.user.address);
    console.log(this.currentAddress);
    const res = await this.rest.post(
      `${this.apiUrl}/api/accounts/address`,
      this.currentAddress
    );
    res['success']
      ? (this.data.success(res['message']),
        console.log('oldu'),
        await this.getProfile())
      : (this.data.error(res['message']), console.log('olmadı'));
  }

  async uploadPicture() {
    this.uploading = true;
    const form = new FormData();
    for (const key in this.user) {
      if (this.user.hasOwnProperty(key)) {
        if (key === 'profile_picture') {
          form.append(
            'profile_picture',
            this.user.profile_picture,
            this.user.profile_picture.name
          );
        } else {
          form.append(key, this.user[key]);
        }
      }
    }
    const data = await this.rest.post(
      `${this.apiUrl}/api/accounts/picture`,
      form
    );

    data['success']
      ? this.getProfile().then(
          () => ((this.submitVisible = false), (this.uploading = false))
        )
      : console.log('olmadı');
  }
  preview(files) {
    this.submitVisible = true;
    this.user.profile_picture = files[0];
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }
}
