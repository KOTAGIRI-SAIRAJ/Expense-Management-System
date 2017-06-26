import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {expenseService} from "../expense.service";

@Component({
  selector: 'app-expense-edit',
  templateUrl: './expense-edit.component.html',
  styleUrls: ['./expense-edit.component.css'],
  providers:[FormBuilder,expenseService]
})
export class ExpenseEditComponent implements OnInit {
  expenseForm : FormGroup;
  public router: Router;
  userId:any;
  title:any;amount:number;expenseDate:Date;expensetype:any;
  projectId:number;resourceId:number;status:any;d
  constructor(private fb: FormBuilder,public route: Router,public _expenseService:expenseService,private activatedRoute: ActivatedRoute) {
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
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.getTheIdDetailsFromDataBase(this.userId);
    });
  }
  expensePopup(values){
    values.id = this.userId;
    console.log(values);
    this._expenseService.updateExpenses(values).subscribe((response) => {
      this.revertToExpense();
    })

  }
  revertToExpense(){
    this.router.navigate(['expense']);
  }
  getTheIdDetailsFromDataBase(idValue){
    this._expenseService.getTheDataById(idValue).subscribe((response) => {
      response  = response[0];
      this.title= response.title;
      this.amount= response.amount;
      this.expenseDate = response.expenseDate;
      this.expensetype= response.expensetype;
      this.projectId = response.projectId;
      this.resourceId =  response.resourceId;
      this.status = response.status;
      this.expenseForm = this.fb.group({
        'title' : [this.title, Validators.compose([Validators.required,Validators.maxLength(20)])],
        'amount' : [this.amount, Validators.compose([Validators.required,Validators.maxLength(20)])],
        'expenseDate' : [this.expenseDate, Validators.compose([Validators.required,Validators.maxLength(20)])],
        'expensetype': [this.expensetype, Validators.compose([Validators.required,Validators.maxLength(30)])],
        'projectId': [this.projectId, Validators.compose([Validators.required,Validators.maxLength(20)])],
        'resourceId': [this.resourceId, Validators.compose([Validators.required,Validators.maxLength(20)])],
        'status': [this.status, Validators.compose([Validators.required,Validators.maxLength(20)])]
      });
    });
  }
}
