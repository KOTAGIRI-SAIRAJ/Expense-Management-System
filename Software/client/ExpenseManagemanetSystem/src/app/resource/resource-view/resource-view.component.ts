import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {resourceService} from "../resource.service";
import {projectService} from "../../project/project.service";

@Component({
  selector: 'app-resource-view',
  templateUrl: './resource-view.component.html',
  styleUrls: ['./resource-view.component.css'],
  providers: [resourceService,projectService]
})
export class ResourceViewComponent implements OnInit {
  private value: any = {};
  private _disabledV = '0';
  private disabled = false;
  selectedProject:any = null;
  userId:any;
  public router: Router;
  DOB:any;emailId:any;endDate:any;firstName:any;
  joinDate:any;lastName:any;password:any;role:string;
  public tempFlag:number;
  public allProjectNameForAutoCompleter:Array<any> = [];
  public totalProjects:Array<any> = [];
  constructor(private activatedRoute: ActivatedRoute,public route: Router,public _resourceService:resourceService,public _projectService:projectService) {
    this.router = route;
    this.tempFlag = 0;
    this.router = route;
    this._projectService.getAllProjects().subscribe((allProjects) => {
      allProjects.forEach((eachProject)=>{
        this.totalProjects.push(eachProject);
        this.allProjectNameForAutoCompleter.push(eachProject.projectName);
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
    this._resourceService.getTheDataById(idValue).subscribe((response) => {
      response = response[0];
      this.DOB = response.DOB;
      this.firstName = response.firstName;
      this.lastName = response.lastName;
      this.emailId= response.emailId;
      this.role =response.role;
      this.password = response.password;
      this.endDate = response.endDate;
      this.joinDate = response.joinDate;
    });
  }
  revertToProjects(){
    this.router.navigate(['dashboard/resource']);
  }
  onclickProjectsButton(){
    this.tempFlag =1;
  }

  assignProject(){
    if(this.selectedProject !== null) {
      this.totalProjects.forEach((eachProject)=>{
        if( eachProject.projectName === this.selectedProject){
          this.router.navigate(['resource/'+this.userId+'/assignProject/'+eachProject.id]);
        }
      })
    }else{
      alert('select one project');
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
    this.selectedProject = value.id;
  }

  public removed(value: any): void {
    this.selectedProject = null;
  }
}
