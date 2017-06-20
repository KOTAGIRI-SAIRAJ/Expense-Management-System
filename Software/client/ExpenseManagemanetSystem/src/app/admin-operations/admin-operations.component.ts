import {Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ModalDirective} from "ngx-bootstrap/modal";
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-operations',
  templateUrl: './admin-operations.component.html',
  styleUrls: ['./admin-operations.component.css'],
  providers:[FormBuilder]
})
export class AdminOperationsComponent implements OnInit {
  SignUpForm : FormGroup;
  projectsForm : FormGroup;
  @ViewChild('projects') public projects:ModalDirective;
  @ViewChild('SignUp') public SignUp:ModalDirective;
  public router: Router;
  constructor(private fb: FormBuilder,public route: Router) {
    this.router = route;
    this.SignUpForm = this.fb.group({
      'firstName' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'lastName' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'DOB' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'emailId' : ['', Validators.compose([Validators.required,Validators.maxLength(30)])],
      'password' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'joinDate' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'endDate' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'role' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
    });
    this.projectsForm = this.fb.group({
      'projectName' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'projectDescription' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'startDate' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'endDate': ['', Validators.compose([Validators.required,Validators.maxLength(20)])]
    });
  }

  ngOnInit() {
  }
  signUpPopup(values){
    alert("hi from signUpPopup")
    console.log(values);
    this.SignUpForm.reset();
    this.SignUp.hide();

  }
  projectsPopup(values){
    alert('from Projects');
    console.log(values);
    this.projectsForm.reset();
    this.projects.hide();
  }
}
