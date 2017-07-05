import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {projectResourceService} from "./assigned-project-resource.service";
import {projectService} from "../project/project.service";
import {resourceService} from "../resource/resource.service";

@Component({
  selector: 'app-assined-project-resource',
  templateUrl: './assined-project-resource.component.html',
  styleUrls: ['./assined-project-resource.component.css'],
  providers: [projectResourceService,projectService,resourceService]
})
export class AssinedProjectResourceComponent implements OnInit {
  projectId:any ;
  resourceId:any;
  projectResourceDataTable:Array<any> = [];
  constructor(private activatedRoute: ActivatedRoute,public route: Router, public _projectResourceService:projectResourceService,public _resourceService:resourceService,public _projectService:projectService) {
      this.getAllTheProjectResource();
  }

  ngOnInit() {  }

  getAllTheProjectResource(){
    this.activatedRoute.params.subscribe((params: Params) => {
      this.projectId = params['projectId'];
      this.resourceId = params['resourceId'];
      let valuesData= {
        "projectId":this.projectId,
        "resourceId":this.resourceId
      }
      this._projectResourceService.createProjectResource(valuesData).subscribe((projectResourceData) => {
        this._projectResourceService.getAllProjectResources().subscribe((allprojectResourceData)=>{
          this.projectResourceDataTable = allprojectResourceData;
          this._projectService.getAllProjects().subscribe((allProjectData)=>{
              this.projectResourceDataTable.forEach((projectResourceRecord)=>{
                  allProjectData.forEach((eachProject)=>{
                    if(projectResourceRecord.projectId === eachProject.id){
                      projectResourceRecord.projectId = eachProject.projectName;
                    }
                  })
              })
          })
          this._resourceService.getAllResources().subscribe((allResourceData)=>{
            this.projectResourceDataTable.forEach((projectResourceRecord)=>{
              allResourceData.forEach((eachResource)=>{
                if(projectResourceRecord.resourceId === eachResource.id){
                  projectResourceRecord.resourceId = eachResource.firstName+' '+eachResource.lastName;
                }
              })
            })
          })

        })
      })
    });
  }

}
