import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {resourceService} from "../resource.service";
import {UserService} from "../../homepage/user.service";
import {localStorageService} from "../../app.service";


@Component({
  selector: 'app-resource-add',
  templateUrl: './resource-add.component.html',
  styleUrls: ['./resource-add.component.css'],
  providers:[FormBuilder,resourceService,UserService,localStorageService]
})
export class ResourceAddComponent implements OnInit {
  resourceForm : FormGroup;
  public router: Router;
  flag = 0;
  LoggedInPersonType = null;
  allEmailsFromResource:Array<any> =[];
  constructor(private fb: FormBuilder,public route: Router,public _resourceService:resourceService,public _UserService:UserService,public  _localStorageService:localStorageService) {
    this.router = route;
    let localstoragedata = _localStorageService.getLocalStorageValue();
    this.LoggedInPersonType = localstoragedata.role;
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
    this._resourceService.getAllResources().subscribe((allResources) => {
      allResources.forEach((eachResource)=>{
        this.allEmailsFromResource.push(eachResource.emailId);
      })
    })
  }
  resourceData(values){
    this._resourceService.createResource(values).subscribe((response) => {
      this._UserService.createUser(values).subscribe((response) => {

      })
      this.resourceForm.reset();
      this.revertToResources();
    });
  }
  revertToResources(){
    this.router.navigate(['resource']);
  }
  emailCheck(emailTyped){
    this.flag =0;
    this.allEmailsFromResource.forEach((eachRecord)=>{
      if (eachRecord.search(emailTyped) == -1 ) {

      } else {
        this.flag = 1;
      }
    })
  }
}
