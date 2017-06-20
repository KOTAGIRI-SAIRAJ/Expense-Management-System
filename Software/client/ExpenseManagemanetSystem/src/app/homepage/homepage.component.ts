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
  LogInForm : FormGroup;

  @ViewChild('LogIn') public LogIn:ModalDirective;

  public router: Router;
  constructor(private fb: FormBuilder,public route: Router,private _userService: UserService) {
    this.router = route;
    this.LogInForm = this.fb.group({
      'firstname': ['',Validators.compose([Validators.required,Validators.maxLength(20)])],
      'lastname': ['',Validators.compose([Validators.required,Validators.maxLength(20)])],
      'DOB':['',Validators.compose([Validators.required,Validators.maxLength(20)])],
      'emailId' : ['', Validators.compose([Validators.required,Validators.maxLength(30)])],
      'password' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])]
    });

  }

  ngOnInit() {
  }
  loginPopup(values){
    alert("hi from loginPopup")
    console.log(values);
    this.LogInForm.reset();
    this.LogIn.hide();
    this._userService.createProject(values).subscribe((response) => { });
    /*this.router.navigate(['home/adminOperations']);*/
    this.getTheDetails();
  }
  getTheDetails(){
    let a = 2;
    this._userService.getById(a).subscribe((response) => {
      console.log(response);
    })
  }

}
