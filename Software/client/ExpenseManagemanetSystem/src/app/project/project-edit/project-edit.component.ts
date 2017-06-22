import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {projectService} from "../project.service";



@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css'],
  providers:[FormBuilder,projectService]
})
export class ProjectEditComponent implements OnInit {
  projectsForm : FormGroup;
  public router: Router;
  userId:any;
  public projectName;public projectDescription;
  public projectStartDate;public projectEndDate;
  constructor(private fb: FormBuilder,public route: Router,public _projectService:projectService,private activatedRoute: ActivatedRoute) {
    this.router = route;
    this.projectsForm = this.fb.group({
      'projectName' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'projectDescription' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'projectStartDate' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'projectEndDate': ['', Validators.compose([Validators.required,Validators.maxLength(20)])]
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.getTheIdDetailsFromDataBase(this.userId);
    });
  }
  projectsPopup(values){
    alert('from Projects');
    console.log(values);
    console.log("-------------"+this.userId)
  }
  getTheIdDetailsFromDataBase(idValue){
    this._projectService.getTheDataById(idValue).subscribe((response) => {
      response  = response[0];
      this.projectName = response.projectName;
      this.projectDescription = response.projectDescription;

      this.projectStartDate = response.projectStartDate;
      this.projectEndDate = response.projectEndDate;
    });
  }

}
