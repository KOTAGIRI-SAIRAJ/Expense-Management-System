import {Component, OnInit, ViewChild} from '@angular/core';
import {projectService} from "./project.service";
import {ModalDirective} from "ngx-bootstrap";
import {Router} from '@angular/router';
import {localStorageService} from "../app.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers :[projectService,localStorageService]
})
export class ProjectComponent implements OnInit {
  private value: any = {};
  private _disabledV = '0';
  private disabled = false;
  public router: Router;
  public allProjectDetails:Array<any> =[];
  public totalProjectDetails:Array<any> =[];
  LoggedInPersonType = '';
  public allProjectNamesForAutoCompleter:Array<any>;
  tempProjectDetails:any;
  tempProjectName:string = '';
  @ViewChild('DeleteProjectDetails') public DeleteProjectDetails:ModalDirective;
  constructor(public _projectService:projectService,public route: Router,public _localStorage:localStorageService) {
    let loggedInInfo = this._localStorage.getLocalStorageValue();
    this.LoggedInPersonType = loggedInInfo.role;
    this.router = route;
    this.getTheProjectsData();
  }

  ngOnInit() {
    this.allProjectNamesForAutoCompleter = [];
    this._projectService.getAllProjects().subscribe(ProjectDetails=>{
      ProjectDetails.forEach((eachRecord)=>{
        let flag = 0;
        if(this.allProjectNamesForAutoCompleter.length === 0){
          this.allProjectNamesForAutoCompleter.push(eachRecord.projectName);
          flag =1;
        }else{
          this.allProjectNamesForAutoCompleter.forEach((eachProject)=>{
            if(eachProject === eachRecord.projectName){
              flag =1;
            }
          })
        }
        if(flag === 0){
          this.allProjectNamesForAutoCompleter.push(eachRecord.projectName);
        }
      })
    })
  }

  getTheProjectsData(){
    this._projectService.getAllProjects().subscribe(ProjectDetails=>{
      this.allProjectDetails =  [];
      ProjectDetails.forEach((eachRecord)=>{
        var date = new Date(eachRecord.projectStartDate);
        eachRecord.projectStartDate = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
        var date = new Date(eachRecord.projectEndDate);
        eachRecord.projectEndDate = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
        this.allProjectDetails.push(eachRecord);
      });
      this.totalProjectDetails = this.allProjectDetails;
    });
  }
  ViewProjectdata(values){
    this.router.navigate(['project/'+values.id]);
  }
  EditProjectData(values){
    this.router.navigate(['project/'+values.id+'/edit']);
  }
  DeleteProjectData(values){
    this._projectService.deleteTheProjectRecord(values.id).subscribe(project=>{
        console.log('Sucessfully Deleted');
        this.getTheProjectsData();
    });
    this.hideDeleteProjectDetails();
  }
  deleteProjectData = (Data):void =>{
    this.tempProjectDetails = Data;
    this.tempProjectName = Data.projectName;
    this.DeleteProjectDetails.show();
  };
  public hideDeleteProjectDetails = ():void =>{
    this.DeleteProjectDetails.hide();
  };


  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value: any): void {
    this.updateDataTable(value.id);
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);

  }

  public typed(value: any): void {
    console.log('from Typed '+value)
  }

  public refreshValue(value: any): void {
    this.value = value;
  }

  updateDataTable(projectname){
    let tempProjectDetailsarray = this.totalProjectDetails;
    tempProjectDetailsarray.forEach((eachRecord)=>{
      if(eachRecord.projectName === projectname){
        this.allProjectDetails = [];
        this.allProjectDetails.push(eachRecord);
      }
    })
  }
  
}
