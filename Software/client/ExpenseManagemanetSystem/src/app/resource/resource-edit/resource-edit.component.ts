import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {resourceService} from "../resource.service";

@Component({
  selector: 'app-resource-edit',
  templateUrl: './resource-edit.component.html',
  styleUrls: ['./resource-edit.component.css'],
  providers: [resourceService,FormBuilder]
})

export class ResourceEditComponent implements OnInit {

  resourceForm : FormGroup;
  public router: Router;
  userId:any;
  DOB:any;emailId:any;endDate:any;firstName:any;
  joinDate:any;lastName:any;password:any;role:string;

  constructor(private fb: FormBuilder,public route: Router,public _resourceService:resourceService,private activatedRoute: ActivatedRoute) {
    this.router = route;
    this.resourceForm = this.fb.group({
      'firstName' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'lastName' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'DOB' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'emailId' : ['', Validators.compose([Validators.required,Validators.maxLength(30)])],
      'password' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'joinDate' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'endDate' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'role' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.getTheIdDetailsFromDataBase(this.userId);
    });
  }

  resourceData(values){
    values.id = this.userId;
    this._resourceService.updateResource(values).subscribe((response) => {
      this.revertToResources();
    });
  }

  getTheIdDetailsFromDataBase(idValue){
    this._resourceService.getTheDataById(idValue).subscribe((response) => {
      response  = response[0];
      this.DOB = response.DOB;
      this.firstName = response.firstName;
      this.lastName = response.lastName;
      this.emailId= response.emailId;
      this.role =response.role;
      this.password = response.password;
      this.endDate = response.endDate;
      this.joinDate = response.joinDate;
      this.resourceForm = this.fb.group({
        'firstName' : [this.firstName, Validators.compose([Validators.required,Validators.maxLength(20)])],
        'lastName' : [this.lastName, Validators.compose([Validators.required,Validators.maxLength(20)])],
        'DOB' : [this.DOB , Validators.compose([Validators.required,Validators.maxLength(20)])],
        'emailId' : [this.emailId, Validators.compose([Validators.required,Validators.maxLength(30)])],
        'password' : [this.password, Validators.compose([Validators.required,Validators.maxLength(20)])],
        'joinDate' : [this.joinDate, Validators.compose([Validators.required,Validators.maxLength(20)])],
        'endDate' : [this.endDate, Validators.compose([Validators.required,Validators.maxLength(20)])],
        'role' : [this.role, Validators.compose([Validators.required,Validators.maxLength(20)])],
      });
    });
  }

  revertToResources(){
    this.router.navigate(['newdashboard/resource']);
  }
}
