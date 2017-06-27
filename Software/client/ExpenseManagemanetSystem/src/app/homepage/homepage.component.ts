import {Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from "./user.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers:[FormBuilder,UserService]
})
export class HomepageComponent implements OnInit {
  loginForm: FormGroup;
  public router: Router;

  constructor(private fb: FormBuilder, public route: Router, private _userService: UserService) {
    this.router = route;
    this.loginForm = this.fb.group({
      'emailId': ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      'password': ['', Validators.compose([Validators.required, Validators.maxLength(20)])]
    });

  }

  ngOnInit() {
  }

  loginData(values) {
    console.log(values);
    this.loginForm.reset();
    this._userService.createUser(values).subscribe((response) => {
      this.router.navigate(['dashboard']);
    });

  }

  checkforCredentials(values) {

    this._userService.getAllUsers().subscribe(allUserDetails => {
      let flag =0;
      allUserDetails.forEach((eachRecord) => {
        if (eachRecord.emailId === values.emailId && eachRecord.password === values.password && eachRecord.role === "ExpenseAdmin") {
          flag = 0;
          this.router.navigate(['dashboard']);
          this.loginForm.reset();
        } else if (eachRecord.emailId === values.emailId && eachRecord.password === values.password && eachRecord.role === "Manager") {
          flag = 0;
          this.router.navigate((['expense']));
          this.loginForm.reset();
        } else if (eachRecord.emailId === values.emailId && eachRecord.password === values.password && eachRecord.role === "Staff") {
          flag = 0;
          this.router.navigate((['expense/create']));
          this.loginForm.reset();
        }else{
          flag = 1;
        }
      });
      if(flag === 1){
        this.loginForm.reset();
      }
    });

  }
}
