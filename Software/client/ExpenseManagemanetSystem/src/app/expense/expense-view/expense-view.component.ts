import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {expenseService} from "../expense.service";
import {projectService} from "../../project/project.service";

@Component({
  selector: 'app-expense-view',
  templateUrl: './expense-view.component.html',
  styleUrls: ['./expense-view.component.css'],
  providers:[expenseService,projectService]
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

  constructor(private activatedRoute: ActivatedRoute, public route: Router, public _expenseService: expenseService,public _projectService:projectService) {
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
    this._expenseService.getTheDataById(idValue).subscribe((expenseRecord) => {
      expenseRecord= expenseRecord[0];
      this._projectService.getTheDataById(expenseRecord.projectId).subscribe((projectRecord) => {
        this.title = expenseRecord.title;
        this.amount = expenseRecord.amount;
        this.expenseDate = expenseRecord.expenseDate;
        this.expensetype = expenseRecord.expensetype;
        this.projectId = projectRecord[0].projectName;
        this.resourceId = expenseRecord.resourceId;
        this.status = expenseRecord.status;
      })

    });
  }
  revertToExpense(){
    this.router.navigate(['expense']);
  }
}
