import { Component, OnInit } from '@angular/core';
import {addProjectService} from "./addProject.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers :[addProjectService]
})
export class ProjectComponent implements OnInit {

  constructor(public _addProjectService:addProjectService) {
    console.log("from consturctor")
    this.getTheProjectsData();
  }

  ngOnInit() {
  }
  getTheProjectsData(){
    this._addProjectService.getAllResources().subscribe(emp=>{
      console.log(emp)
    })
  }
}
