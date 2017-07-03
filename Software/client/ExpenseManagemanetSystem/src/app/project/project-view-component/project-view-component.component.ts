import { Component, OnInit } from '@angular/core';
import {projectResourceService} from "../../assined-project-resource/assigned-project-resource.service";
import {projectService} from "../project.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {resourceService} from "../../resource/resource.service";

@Component({
  selector: 'app-project-view-component',
  templateUrl: './project-view-component.component.html',
  styleUrls: ['./project-view-component.component.css'],
  providers:[projectResourceService,projectService,resourceService]
})
export class ProjectViewComponentComponent implements OnInit {
  public projectName;public projectDescription;
  public projectStartDate;public projectEndDate;
  public userId:any;
  public router: Router;
  public tempFlag:number;
  public projectResourceData:Array<any>=[];
  public autoCompleterForResources:Array<any> =[];
  constructor(public _projectService:projectService,private activatedRoute: ActivatedRoute,public route: Router,public _projectResourceService:projectResourceService,public _resourceService:resourceService) {
    this.router = route;
    this.tempFlag = 0;
    this.getTheURLprojectId();
    this.settingAndUpdatingDataTable();
  }

  ngOnInit() {  }

  getTheURLprojectId(){
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.getTheProjectIdDetails();
    });
  }
  getTheProjectIdDetails(){
    this._projectService.getTheDataById(this.userId).subscribe((ProjectDetails)=>{
      ProjectDetails = ProjectDetails[0];
      this.projectName = ProjectDetails.projectName;
      this.projectDescription = ProjectDetails.projectDescription;
      this.projectStartDate = ProjectDetails.projectStartDate;
      this.projectEndDate = ProjectDetails.projectEndDate
    })
  }
  revertToProjects(){
    this.router.navigate(['project']);
  }
  onclickResourceButton(){
    this.tempFlag =1;
  }
  settingAndUpdatingDataTable(){
    this._projectResourceService.getAllProjectResources().subscribe((projectResourceData)=>{

      projectResourceData.forEach((eachRecord)=>{
        this.projectResourceData.push(projectResourceData[0]);
      })
      /*console.log(this.projectResourceData);*/
      this.gettingTheTotalResourceDetails();
    })
  }
  gettingTheTotalResourceDetails(){
    this._resourceService.getAllResources().subscribe((allResourceDetails)=>{
      allResourceDetails.forEach((eachResourceRecord)=>{
        let flag = 0;
        this.projectResourceData.forEach((eachProjectResourceRecord)=>{
          /*console.log(eachResourceRecord.id+' === '+eachProjectResourceRecord.resourceId);*/
          if(eachResourceRecord.id === eachProjectResourceRecord.resourceId){
            /*console.log(eachResourceRecord.id+' from flag '+eachProjectResourceRecord.resourceId);*/
            flag =1;
          }
        })
        if(flag === 0){
          this.autoCompleterForResources.push(eachResourceRecord.firstName+' '+eachResourceRecord.lastName);
        }
      })
    })
   /* console.log(this.autoCompleterForResources);*/
  }
}
