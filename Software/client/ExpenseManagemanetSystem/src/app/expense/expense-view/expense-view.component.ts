import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {expenseService} from "../expense.service";

@Component({
  selector: 'app-expense-view',
  templateUrl: './expense-view.component.html',
  styleUrls: ['./expense-view.component.css'],
  providers:[expenseService]
})
export class ExpenseViewComponent implements OnInit {
  userId: any;
  title: any;
  amount: any;
  expenseDate: any;
  expensetype: any;
  projectId: any;
  resourceId: any;
  status: any;
  public router: Router;

  constructor(private activatedRoute: ActivatedRoute, public route: Router, public _expenseService: expenseService) {
    this.router = route;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['id'];
      console.log(this.userId);
      this.getTheIdDetailsFromDataBase(this.userId);
    });
  }

  getTheIdDetailsFromDataBase(idValue) {
    this._expenseService.getTheDataById(idValue).subscribe((response) => {
      response = response[0];
      console.log(response);
      this.title = response.title;
      this.amount = response.amount;
      this.expenseDate = response.expenseDate;
      this.expensetype = response.expensetype;
      this.projectId = response.projectId;
      this.resourceId = response.resourceId;
      this.status = response.status;
    });
  }
  revertToExpense(){
    this.router.navigate(['expense']);
  }
}
