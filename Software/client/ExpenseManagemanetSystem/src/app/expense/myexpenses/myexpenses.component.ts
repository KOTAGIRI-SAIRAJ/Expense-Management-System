import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {expenseService} from ".././expense.service";
import {projectService} from "../../project/project.service";
import {resourceService} from "../../resource/resource.service";
import {localStorageService} from "../../app.service";

@Component({
  selector: 'app-myexpenses',
  templateUrl: './myexpenses.component.html',
  styleUrls: ['./myexpenses.component.css'],
  providers :[expenseService,projectService,resourceService,localStorageService]
})
export class MyexpensesComponent implements OnInit {
  public router: Router;
  LoggedInPersonType:any;
  allExpenseDetails:Array<any>=[];
  totalExpenseDetails:Array<any> = [];
  projectDetailsTotal:Array<any> =[];
  resourceDetailsTotal:Array<any> =[];

  constructor(public _expenseService:expenseService,public route: Router,public _projectService: projectService,public _resourceService: resourceService,public _localStorageService:localStorageService) {
    this.router = route;
    let loggedPersonData = _localStorageService.getLocalStorageValue();

    this.LoggedInPersonType = loggedPersonData.role;
    this._projectService.getAllProjects().subscribe(projectDetails=>{
      this.projectDetailsTotal = projectDetails;
      this.getTheResourcesData();
    });
    this._resourceService.getAllResources().subscribe(resourceDetails=>{
      this.resourceDetailsTotal = resourceDetails;
      this.getTheResourcesData();
    });
  }

  ngOnInit() {  }

  getTheResourcesData() {
    this._expenseService.getAllExpenses().subscribe(ExpenseDetails=>{
      this.allExpenseDetails =  [];
      ExpenseDetails.forEach((eachRecord)=>{
        var date = new Date(eachRecord.expenseDate);

        eachRecord.expenseDate = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
        this.projectDetailsTotal.forEach((eachProjectRecord)=>{
          if(eachProjectRecord.id === eachRecord.projectId){
            eachRecord.projectId = eachProjectRecord.projectName;
          }
        })
        this.resourceDetailsTotal.forEach((eachResourceRecord)=>{
          if(eachResourceRecord.id === eachRecord.resourceId){
            eachRecord.resourceId = eachResourceRecord.firstName+' '+eachResourceRecord.lastName;
          }
        })
        this.allExpenseDetails.push(eachRecord);
      });
      this.totalExpenseDetails = this.allExpenseDetails;
      this.updateExpensesWithoutTheLoggedPerson();
    });
  }

  updateExpensesWithoutTheLoggedPerson(){
    let temp = this.allExpenseDetails;
    let localstoragedata = this._localStorageService.getLocalStorageValue();
    this.allExpenseDetails = [];
    temp.forEach((eachRecord)=>{
      let tmp=0;
      if(eachRecord.resource.role === localstoragedata.role && eachRecord.resource.emailId=== localstoragedata.emailId){
        tmp =1;
      }
      if(tmp === 1){
        this.allExpenseDetails.push(eachRecord);
      }
    })
  }

}
