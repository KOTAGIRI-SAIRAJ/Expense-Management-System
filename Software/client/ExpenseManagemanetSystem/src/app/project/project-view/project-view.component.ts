import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {projectService} from "../project.service";
import {resourceService} from "../../resource/resource.service";

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css'],
  providers:[projectService,resourceService]
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
  public allResourceNamesForAutoCompleter:Array<any> = [];
  public totalResources:Array<any> = [];
  constructor(private activatedRoute: ActivatedRoute,public route: Router,public _projectService:projectService,public _resourceService:resourceService) {
    this.tempFlag = 0;
    this.router = route;
    this._resourceService.getAllResources().subscribe((allResources) => {
        allResources.forEach((eachResource)=>{
          this.totalResources.push(eachResource);
          this.allResourceNamesForAutoCompleter.push(eachResource.firstName+' '+eachResource.lastName);
        })
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
            this.router.navigate(['project/'+this.userId+'/resource/'+eachResource.id]);
          }
        })
    }else{
      alert('select one resource');
    }
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
}
