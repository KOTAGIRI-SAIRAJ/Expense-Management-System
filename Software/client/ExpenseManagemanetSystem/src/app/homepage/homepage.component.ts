import {Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from "./user.service";
import {localStorageService} from "../app.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers:[FormBuilder,UserService,localStorageService]
})
export class HomepageComponent implements OnInit {
  loginForm: FormGroup;
  public router: Router;
  flag = 0;
  constructor(private fb: FormBuilder, public route: Router, private _userService: UserService,public _localStorage:localStorageService) {
    this.router = route;
    this.loginForm = this.fb.group({
      'emailId': ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      'password': ['', Validators.compose([Validators.required, Validators.maxLength(20)])]
    });

  }

  ngOnInit() {
  }

  loginData(values) {

    this.loginForm.reset();
    this._userService.createUser(values).subscribe((response) => {
      this.router.navigate(['dashboard']);
    });

  }

  checkforCredentials(values) {

    this._userService.getAllUsers().subscribe(allUserDetails => {
      this.flag = 0;
      let flag =0;
      allUserDetails.forEach((eachRecord) => {
        if (eachRecord.emailId === values.emailId && eachRecord.password === values.password ) {
          flag = 0;
          this._localStorage.setLocalStorageValue(eachRecord);
          this.router.navigate(['newdashboard']);
          this.loginForm.reset();
        }else{
          flag = 1;
        }
      });
      if(flag === 1){
        this.loginForm.reset();
        this.flag = 1;
      }
    });
  }
}
