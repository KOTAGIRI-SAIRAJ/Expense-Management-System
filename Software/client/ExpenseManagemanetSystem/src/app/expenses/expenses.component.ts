import {Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ModalDirective} from "ngx-bootstrap/modal";
import {Router} from '@angular/router'

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
  providers:[FormBuilder]
})
export class ExpensesComponent implements OnInit {
  expensesForm : FormGroup;
  @ViewChild('expenses') public expenses:ModalDirective;
  public router: Router;
  constructor(private fb: FormBuilder,public route: Router) {
    this.router = route;
    this.expensesForm = this.fb.group({
      'title' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'amount' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'date' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'description': ['', Validators.compose([Validators.required,Validators.maxLength(40)])],
      'expensetype': ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'projectId': ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'resourceId': ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'status': ['', Validators.compose([Validators.required,Validators.maxLength(20)])]
    });
  }

  ngOnInit() {
  }
  expensesPopup(values){
    alert('from Expenses');
    console.log(values);
    this.expensesForm.reset();
    this.expenses.hide();
  }
}
