import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {projectService} from "../project.service";
import {resourceService} from "app/resource/resource.service";
import {ProjectResourcesService} from "../project_resources.service";

@Component({
  selector: 'app-prjectview',
  templateUrl: './prjectview.component.html',
  styleUrls: ['./prjectview.component.css'],
  providers: [projectService,resourceService,ProjectResourcesService]
})
export class PrjectviewComponent implements OnInit {
  private value: any = {};
  private _disabledV = '0';
  private disabled = false;
  public projectName;public projectDescription;
  public projectStartDate;public projectEndDate;
  userId:any;
  public router: Router;
  dataTableFlag:number;
  selectedResource:any = null;
  public totalResourceData:Array<any> = [];
  public tempFlag:number;
  public resourceAutoCompleterNames:Array<any> =[];
  public allProjectResourceDataTableValues:Array<any> =[];
  constructor(private activatedRoute: ActivatedRoute,public _projectService:projectService,public route: Router,public _resourceService:resourceService,public _ProjectResourcesService:ProjectResourcesService) {
    this.router = route;
    this._resourceService.getAllResources().subscribe((allResources) => {
      allResources.forEach((eachResource)=>{
        this.totalResourceData.push(eachResource);
      })
      this.activatedRoute.params.subscribe((params: Params) => {
        this.userId = params['id'];
        this.getTheIdDetailsFromDataBase(this.userId);
      });
      this.forResourceAutoCompleter();
      this.datatableForAssociation();
    })
    this.tempFlag =0;
    this.dataTableFlag =1;
  }

  ngOnInit() {

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

  onclickResourceButton(){
    this.tempFlag=1;

  }

  forResourceAutoCompleter(){
    let data={
      projectId:this.userId,
    }
    this.resourceAutoCompleterNames = [];
    this._ProjectResourcesService.getTheDataByProjectId(data).subscribe((res)=>{
      this.totalResourceData.forEach((eachResource)=>{
        let tflag = 0;
        res.forEach((eachAssocoationRecord)=>{
            if(eachResource.id === eachAssocoationRecord.resource.id ){
              tflag =1;
            }
        })
        if(tflag === 0){
          if(eachResource.role != 'ExpenseAdmin'){
            let autoCompleterRecord ={
              id:eachResource.id,
              text:eachResource.firstName+' '+eachResource.lastName
            }
            this.resourceAutoCompleterNames.push(autoCompleterRecord);
          }

        }
      })
    })
  }
  revertToProjects(){
    this.router.navigate(['newdashboard/project']);
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

  }

  public removed(value: any): void {
    this.selectedResource = null;

  }

  assignResource(){
    if(this.selectedResource != null){
      let data={
        projectId:this.userId,
        resourceId:this.selectedResource.id
      }
      this._ProjectResourcesService.createProjectResource(data).subscribe((result)=>{
        this.forResourceAutoCompleter();
        this.datatableForAssociation();
      })
    }
  }

  datatableForAssociation(){
    let data={
      projectId:this.userId,
    }
    this._ProjectResourcesService.getTheDataByProjectId(data).subscribe((allAssociationData)=>{
      this.allProjectResourceDataTableValues = [];
      allAssociationData.forEach((eachRecord)=>{
        let assocoationtemp = {
          projectId:eachRecord.project.id,
          resourceId:eachRecord.resource.id,
          projectname:eachRecord.project.projectName,
          ResourceName:eachRecord.resource.firstName+' '+eachRecord.resource.lastName
        }
        this.allProjectResourceDataTableValues.push(assocoationtemp);
      })
    })
  }

  deleteProjectResourceData(value){
    let data= {
      projectId:value.projectId,
      resourceId:value.resourceId
    }
    this._ProjectResourcesService.deleteTheProjectResourceRecord(data).subscribe((responce)=>{
      console.log(responce)
      this.forResourceAutoCompleter();
      this.datatableForAssociation();
    })
  }
}
