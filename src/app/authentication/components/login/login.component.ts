import { Component, OnInit } from '@angular/core';
import { MSALService } from '../../service/msal.service';
import { Router } from '@angular/router';
import { AuthenticationSandbox } from '../../sandbox/authentication.sandbox';

@Component({
  selector: 'ccw-auth',
  templateUrl:'./login.component.html'
})

export class LoginComponent  {

  user: any;
  token:string;
  constructor(private authSandbox: AuthenticationSandbox) {
    // const token: string = this.authSandbox.getToken();
    // if (token === null || token === undefined || token === 'null' || token == '') {
    //   this.authSandbox.login();
    // }
    // // this.user=this.authSandbox.getUser();
    // this.token=this.authSandbox.getToken();
  }

  login(){
    const token: string = this.authSandbox.getToken();
    if (token === null || token === undefined || token === 'null') {
      this.authSandbox.login();
    }
    this.user=this.authSandbox.getUser();
    console.log(this.user);
    this.token=this.authSandbox.getToken();
  }
  adlogin(){
    const token: string = this.authSandbox.getToken();
    if (token === null || token === undefined || token === 'null') {
      this.authSandbox.adlogin();
    }
    this.user=this.authSandbox.getUser();
    console.log(this.user);
    this.token=this.authSandbox.getToken();
  }
  
  signUpSignIn(){
    const token: string = this.authSandbox.getToken();
    if (token === null || token === undefined || token === 'null') {
      this.authSandbox.signUpSignIn();
    }
    this.user=this.authSandbox.getUser();
    console.log(this.user);
    this.token=this.authSandbox.getToken();
  }
  logout(){
    this.authSandbox.logout();
  }

}
