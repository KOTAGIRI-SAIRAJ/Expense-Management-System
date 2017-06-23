import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {projectService} from "../project.service";

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css'],
  providers:[projectService]
})
export class ProjectViewComponent implements OnInit {
  userId:any;
  public projectName;public projectDescription;
  public projectStartDate;public projectEndDate;
  public router: Router;

  constructor(private activatedRoute: ActivatedRoute,public route: Router,public _projectService:projectService) {
    this.router = route;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['id'];
      console.log(this.userId);
      this.getTheIdDetailsFromDataBase(this.userId);
    });
  }
  getTheIdDetailsFromDataBase(idValue){
    this._projectService.getTheDataById(idValue).subscribe((response) => {
      response = response[0];
      console.log(response);
      this.projectName = response.projectName;
      this.projectDescription = response.projectDescription;
      this.projectStartDate = response.projectStartDate;
      this.projectEndDate = response.projectEndDate;
    });
  }
  revertToProjects(){
    this.router.navigate(['project']);
  }
}
