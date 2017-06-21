import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {addProjectService} from "../addProject.service";

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css'],
  providers:[FormBuilder,addProjectService]
})
export class ProjectAddComponent implements OnInit {
  projectsForm : FormGroup;
  public router: Router;
  constructor(private fb: FormBuilder,public route: Router,public _addProjectService:addProjectService) {
    this.router = route;
    this.projectsForm = this.fb.group({
      'projectName' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'projectDescription' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'projectStartDate' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'projectEndDate': ['', Validators.compose([Validators.required,Validators.maxLength(20)])]
    });
  }

  ngOnInit() {
  }
  projectsPopup(values){
    alert('from Projects');
    console.log(values);
    this._addProjectService.createProject(values).subscribe((response) => { });
    this.projectsForm.reset();
    //this.revertToProjects();
  }
  revertToProjects(){
    this.router.navigate(['project']);
  }
}
