import {Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ModalDirective} from "ngx-bootstrap/modal";
import {Router} from '@angular/router';
import {UserService} from "./user.service";



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers:[FormBuilder,UserService]
})
export class HomepageComponent implements OnInit {
  loginForm : FormGroup;
  public router: Router;
  constructor(private fb: FormBuilder,public route: Router,private _userService: UserService) {
    this.router = route;
    this.loginForm = this.fb.group({
      'emailId' : ['', Validators.compose([Validators.required,Validators.maxLength(30)])],
      'password' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])]
    });

  }

  ngOnInit() {
  }
  loginPopup(values){
    alert("hi from loginPopup")
    console.log(values);
    this.loginForm.reset();
    this._userService.createProject(values).subscribe((response) => {
      this.router.navigate(['dashboard']);
    });

  }
  checkforCredentials(values){
    this._userService.getAllUsers().subscribe(allUserDetails=>{
      console.log(allUserDetails)
        allUserDetails.forEach((eachRecord)=>{
          if(eachRecord.emailId === values.emailId && eachRecord.password === values.password){
            this.router.navigate(['dashboard']);
            this.loginForm.reset();
          }else{
            this.router.navigate(['home']);
            this.loginForm.reset();
          }
        })
    });
  }

}
