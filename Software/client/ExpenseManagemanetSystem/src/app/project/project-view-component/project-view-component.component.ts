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
  private value: any = {};
  private _disabledV = '0';
  private disabled = false;
  selectedResource:any = null;
  public projectName;public projectDescription;
  public projectStartDate;public projectEndDate;
  public userId:any;
  public router: Router;
  public tempFlag:number;
  public dataTableFlag:any;
  public projectResourceData:Array<any>=[];
  public projectResourceDataDatatable:Array<any> =[]
  public autoCompleterForResources:Array<any> =[];
  constructor(public _projectService:projectService,private activatedRoute: ActivatedRoute,public route: Router,public _projectResourceService:projectResourceService,public _resourceService:resourceService) {
    this.router = route;
    this.tempFlag = 0;
    this.dataTableFlag = 0;
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
    this.projectResourceData =[];
    this.projectResourceDataDatatable =[];
    let data ={
      id:this.userId
    }
    this._projectResourceService.getAllProjectResourcesById(data).subscribe((projectResourceData)=>{
      projectResourceData.forEach((eachRecord)=>{
        let data={
          pId: eachRecord.projectId,
          projectId:eachRecord.project.projectName,
          rId: eachRecord.resourceId,
          resourceId:eachRecord.resource.firstName+' '+eachRecord.resource.lastName
        }
        let idData = {
          projectId:eachRecord.projectId,
          resourceId:eachRecord.resourceId
        }
        this.projectResourceData.push(idData);
        this.projectResourceDataDatatable.push(data);
      })
      this.dataTableFlag =1;
      this.gettingTheTotalResourceDetails();
    })
  }

  assignResource(){
    if(this.selectedResource !== null) {
      let valuesData= {
        "projectId":this.userId,
        "resourceId":this.selectedResource.id
      }
      this._projectResourceService.createProjectResource(valuesData).subscribe((createdResponse)=>{
        this.settingAndUpdatingDataTable();
      })
    }
  }

  gettingTheTotalResourceDetails(){
    this.autoCompleterForResources = [];
    this._resourceService.getAllResources().subscribe((allResourceDetails)=>{
      allResourceDetails.forEach((eachResourceRecord)=>{
        let flag = 0;
        this.projectResourceData.forEach((eachProjectResourceRecord)=>{
          if(eachResourceRecord.id === eachProjectResourceRecord.resourceId){
            flag =1;
          }
        })
        if(flag === 0){
          let autoCompleterRecord ={
            id:eachResourceRecord.id,
            text:eachResourceRecord.firstName+' '+eachResourceRecord.lastName
          }
          this.autoCompleterForResources.push(autoCompleterRecord);
        }
      })
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
    this.selectedResource = value;
      console.log(this.selectedResource);
  }

  public removed(value: any): void {
    this.selectedResource = null;
    console.log(this.selectedResource);
  }

  deleteProjectResourceData(values){
    console.log(values)
    this._projectResourceService.deleteTheProjectResource(values).subscribe((responce)=>{
      this.settingAndUpdatingDataTable();
    })
  }
}
