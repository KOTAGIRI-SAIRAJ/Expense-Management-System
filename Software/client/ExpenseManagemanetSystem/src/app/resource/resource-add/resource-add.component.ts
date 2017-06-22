import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {resourceService} from "../resource.service";


@Component({
  selector: 'app-resource-add',
  templateUrl: './resource-add.component.html',
  styleUrls: ['./resource-add.component.css'],
  providers:[FormBuilder,resourceService]
})
export class ResourceAddComponent implements OnInit {
  resourceForm : FormGroup;
  public router: Router;
  constructor(private fb: FormBuilder,public route: Router,public _resourceService:resourceService) {
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
  }
  resourcePopup(values){
    alert("hi from resourcePopup")
    this._resourceService.createResource(values).subscribe((response) => {
      this.resourceForm.reset();
      this.revertToResources();
    });
  }
  revertToResources(){
    this.router.navigate(['resource']);
  }
}
