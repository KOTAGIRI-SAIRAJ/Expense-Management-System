import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {projectService} from "../project.service";
import {resourceService} from "../../resource/resource.service";
import {projectResourceService} from "../../assined-project-resource/assigned-project-resource.service";

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css'],
  providers:[projectService,resourceService,projectResourceService]
})
export class ProjectViewComponent implements OnInit {
  private value: any = {};
  private _disabledV = '0';
  private disabled = false;
  selectedResource:any = null;
  userId:any;
  public projectName;public projectDescription;
  public projectStartDate;public projectEndDate;
  public router: Router;
  public tempFlag:number;
  dataTableFlag = 0;
  allProjectResoureData:Array<any> =[];
  allProjectResourceDataTableValues:Array<any> =[];
  public allResourceNamesForAutoCompleter:Array<any> = [];
  public totalResources:Array<any> = [];
  constructor(private activatedRoute: ActivatedRoute,public route: Router,public _projectService:projectService,public _resourceService:resourceService,public _projectResourceService:projectResourceService) {
    this.tempFlag = 0;
    this.router = route;

    this._resourceService.getAllResources().subscribe((allResources) => {
      allResources.forEach((eachResource)=>{
        this.totalResources.push(eachResource);
      })
      this.dataTableForTheSelectedProjectResource();
    })
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.getTheIdDetailsFromDataBase(this.userId);


    });
  }
  getTheIdDetailsFromDataBase(idValue){
    this._projectService.getTheDataById(idValue).subscribe((response) => {
      response = response[0];
      this.projectName = response.projectName;
      this.projectDescription = response.projectDescription;
      this.projectStartDate = response.projectStartDate;
      this.projectEndDate = response.projectEndDate;
    });
  }

  revertToProjects(){
    this.router.navigate(['project']);
  }
  onclickResourceButton(){
    this.tempFlag =1;
  }


  assignResource(){
    if(this.selectedResource !== null) {
      this.totalResources.forEach((eachResource)=>{
        if((eachResource.firstName+' '+eachResource.lastName) === this.selectedResource){
          let valuesData= {
            "projectId":this.userId,
            "resourceId":eachResource.id
          }
          this._projectResourceService.createProject(valuesData).subscribe((projectResourceData) => {
            this.dataTableForTheSelectedProjectResource();
          })
        }
      })

    }else{
      alert('select one resource');
    }
  }

  dataTableForTheSelectedProjectResource(){
    let data ={
      id:this.userId
    }
    this.allProjectResoureData = [];
    this._projectResourceService.getAllProjectResourcesById(data).subscribe((getTheRelatedData)=>{
      getTheRelatedData.forEach((eachRecord)=>{
        this.allProjectResoureData.push(eachRecord);
      })
      this.convetIdsToNames();
      this.updateAutoCompleter();
      this.dataTableFlag =1;
    })

  }

  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value: any): void {
    this.selectedResource = value.id;
  }

  public removed(value: any): void {
    this.selectedResource = null;
  }

  updateAutoCompleter(){
    this.allResourceNamesForAutoCompleter =[];
    this.totalResources.forEach((eachResource)=>{
      let tempflag=0;
      this.allProjectResoureData.forEach((projectResourceRecord)=>{
        if(projectResourceRecord.resourceId === eachResource.id){
          tempflag =1;
        }
      })
      if(tempflag === 0){
        this.allResourceNamesForAutoCompleter.push(eachResource.firstName+' '+eachResource.lastName);
      }
    })
  }

  deleteProjectResourceData(values){
    this._projectResourceService.deleteTheProjectResource(values).subscribe((responce)=>{

      this.dataTableForTheSelectedProjectResource();
    })
  }

  convetIdsToNames(){

    this.allProjectResourceDataTableValues = [];

    this.totalResources.forEach((eachRecord)=>{
      this.allProjectResoureData.forEach((eachIdRecord)=>{

        if(eachIdRecord.resourceId === eachRecord.id){
          this._projectService.getTheDataById(eachIdRecord.projectId).subscribe((projectData)=>{
            let tempRecord = {
              pId:eachIdRecord.projectId,
              projectId : projectData[0].projectName,
              rId:eachIdRecord.resourceId,
              resourceId : eachRecord.firstName+' '+eachRecord.lastName,
            }
            this.allProjectResourceDataTableValues.push(tempRecord);

          })

        }
      })
    })
  }
}
