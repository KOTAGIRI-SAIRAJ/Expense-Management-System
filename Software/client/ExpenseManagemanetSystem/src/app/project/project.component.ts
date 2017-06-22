import {Component, OnInit, ViewChild} from '@angular/core';
import {projectService} from "./project.service";
import {ModalDirective} from "ngx-bootstrap";
import {Router} from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers :[projectService]
})
export class ProjectComponent implements OnInit {
  public router: Router;

  public allProjectDetails:Array<any> =[];
  tempProjectDetails:any;
  tempProjectName:string = '';
  @ViewChild('DeleteProjectDetails') public DeleteProjectDetails:ModalDirective;
  constructor(public _projectService:projectService,public route: Router) {
    this.router = route;
    this.getTheProjectsData();
  }

  ngOnInit() {

  }

  getTheProjectsData(){
    this.allProjectDetails =  [];
    this._projectService.getAllProjects().subscribe(ProjectDetails=>{
      ProjectDetails.forEach((eachRecord)=>{
        var date = new Date(eachRecord.projectStartDate);
        eachRecord.projectStartDate = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
        var date = new Date(eachRecord.projectEndDate);
        eachRecord.projectEndDate = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
        this.allProjectDetails.push(eachRecord);
      });
    });

  }
  ViewProjectdata(values){

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
    console.log(this.tempProjectDetails);
    this.DeleteProjectDetails.show();
  };
  public hideDeleteProjectDetails = ():void =>{
    this.DeleteProjectDetails.hide();
  };
}
