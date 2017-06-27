import { Component, OnInit ,ViewChild} from '@angular/core';
import {ModalDirective} from "ngx-bootstrap";
import {Router} from '@angular/router';
import {expenseService} from "./expense.service";
import {projectService} from "../project/project.service";


@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
  providers :[expenseService,projectService]
})
export class ExpenseComponent implements OnInit {
  allResourceNamesForAutoCompleter = [];
  tempExpenseDetails:any;
  public router: Router;
  tempTitle:any;
  allExpenseDetails:Array<any>=[];
  totalExpenseDetails:Array<any> = [];
  projectDetailsTotal:Array<any> =[];
  @ViewChild('DeleteExpenseDetails') public DeleteExpenseDetails:ModalDirective;
  constructor(public _expenseService:expenseService,public route: Router,public _projectService: projectService) {
    this.router = route;
    this._projectService.getAllProjects().subscribe(projectDetails=>{
        this.projectDetailsTotal = projectDetails;
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
