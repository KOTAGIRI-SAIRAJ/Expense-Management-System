import { Component, OnInit ,ViewChild} from '@angular/core';
import {ModalDirective} from "ngx-bootstrap";
import {Router} from '@angular/router';
import {expenseService} from "./expense.service";
import {projectService} from "../project/project.service";
import {resourceService} from "../resource/resource.service";


@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
  providers :[expenseService,projectService,resourceService]
})
export class ExpenseComponent implements OnInit {
  allResourceNamesForAutoCompleter = [];
  tempExpenseDetails:any;
  public router: Router;
  tempTitle:any;
  allExpenseDetails:Array<any>=[];
  totalExpenseDetails:Array<any> = [];
  projectDetailsTotal:Array<any> =[];
  resourceDetailsTotal:Array<any> =[];
  @ViewChild('DeleteExpenseDetails') public DeleteExpenseDetails:ModalDirective;
  constructor(public _expenseService:expenseService,public route: Router,public _projectService: projectService,public _resourceService: resourceService) {
    this.router = route;
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
        console.log(date);
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
    });
  }
  DeleteExpenseData(values){

    this._expenseService.deleteTheExpenseRecord(values).subscribe(Expense=>{
      console.log('Sucessfully Deleted');
      this.getTheResourcesData();
    });
    this.hideDeleteExpenseDetails();
  }
  deleteExpenseData = (Data):void =>{
    this.tempExpenseDetails = Data;
    this.tempTitle = Data.title;
    this.DeleteExpenseDetails.show();
  };
  public hideDeleteExpenseDetails = ():void =>{
    this.DeleteExpenseDetails.hide();
  };
}
