import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {projectService} from "../project.service";

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css'],
  providers:[FormBuilder,projectService]
})
export class ProjectAddComponent implements OnInit {
  projectsForm : FormGroup;
  public router: Router;
  constructor(private fb: FormBuilder,public route: Router,public _projectService:projectService) {
    this.router = route;
    this.projectsForm = this.fb.group({
      'projectName' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'projectDescription' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'projectStartDate' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'projectEndDate': ['', Validators.compose([Validators.required,Validators.maxLength(20)])]
    });
  }

  ngOnInit() {  }

  projectsData(values){
    this._projectService.createProject(values).subscribe((response) => {
      //this.projectsForm.reset();
      this.router.navigate(['dashboard/project']);
      //this.revertToProjects();
    });

  }
  revertToProjects(){
    this.router.navigate(['dashboard/project']);
  }
}
