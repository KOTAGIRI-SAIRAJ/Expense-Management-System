import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {expenseService} from "../expense.service";
import {router} from "../../app.router";


@Component({
  selector: 'app-expense-add',
  templateUrl: './expense-add.component.html',
  styleUrls: ['./expense-add.component.css'],
  providers: [FormBuilder , expenseService]
})
export class ExpenseAddComponent implements OnInit {
  expenseForm : FormGroup;
  public router: Router;
  constructor(private fb: FormBuilder,public route: Router,public _expenseService:expenseService) {
    this.router = route;
    this.expenseForm = this.fb.group({
      'title' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'amount' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'expenseDate' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'expensetype': ['', Validators.compose([Validators.required,Validators.maxLength(30)])],
      'projectId': ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'resourceId': ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'status': ['', Validators.compose([Validators.required,Validators.maxLength(20)])]
    });
  }

  ngOnInit() {
  }
  expensePopup(values){
    this._expenseService.createExpense(values).subscribe((response) => {
      this.revertToExpense();
    })

  }
  revertToExpense(){
    this.router.navigate(['expense']);
  }
}
