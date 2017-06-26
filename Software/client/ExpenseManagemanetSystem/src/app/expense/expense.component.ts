import { Component, OnInit ,ViewChild} from '@angular/core';
import {ModalDirective} from "ngx-bootstrap";
import {Router} from '@angular/router';
import {expenseService} from "./expense.service";


@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
  providers :[expenseService]
})
export class ExpenseComponent implements OnInit {
  allResourceNamesForAutoCompleter = [];
  tempExpenseDetails:any;
  public router: Router;
  tempTitle:any;
  allExpenseDetails:Array<any>=[];
  totalExpenseDetails:Array<any> = [];
  @ViewChild('DeleteExpenseDetails') public DeleteExpenseDetails:ModalDirective;
  constructor(public _expenseService:expenseService,public route: Router) {
    this.router = route;
    this.getTheResourcesData();
  }

  ngOnInit() {
    /*this.allResourceNamesForAutoCompleter = [];
    this._expenseService.getAllResources().subscribe(ExpenseDetails=>{
      ExpenseDetails.forEach((eachRecord)=>{
        let flag = 0;
        if(this.allResourceNamesForAutoCompleter.length === 0){
          this.allResourceNamesForAutoCompleter.push(eachRecord.title);
          flag =1;
        }else{
          this.allResourceNamesForAutoCompleter.forEach((eachExpense)=>{
            if(eachExpense === eachRecord.title){
              flag =1;
            }
          })
        }
        if(flag === 0){
          this.allResourceNamesForAutoCompleter.push(eachRecord.title);
        }
      })
    })*/
  }

  getTheResourcesData() {
    this._expenseService.getAllExpenses().subscribe(ResourceDetails=>{
      this.allExpenseDetails =  [];
      ResourceDetails.forEach((eachRecord)=>{
        var date = new Date(eachRecord.expenseDate);
        console.log(date);
        eachRecord.expenseDate = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
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
    console.log(this.tempExpenseDetails);
    this.DeleteExpenseDetails.show();
  };
  public hideDeleteExpenseDetails = ():void =>{
    this.DeleteExpenseDetails.hide();
  };
}
