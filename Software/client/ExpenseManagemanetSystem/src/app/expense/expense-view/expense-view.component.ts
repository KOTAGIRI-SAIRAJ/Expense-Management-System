import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {expenseService} from "../expense.service";
import {projectService} from "../../project/project.service";
import {resourceService} from "../../resource/resource.service";
import {ModalDirective} from "ngx-bootstrap";

@Component({
  selector: 'app-expense-view',
  templateUrl: './expense-view.component.html',
  styleUrls: ['./expense-view.component.css'],
  providers:[expenseService,projectService,resourceService]
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
  @ViewChild('UpdateStatus') public UpdateStatus:ModalDirective;
  constructor(private activatedRoute: ActivatedRoute, public route: Router, public _expenseService: expenseService,public _projectService:projectService,public _resourceService:resourceService) {
    this.router = route;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['id'];

      this.getTheIdDetailsFromDataBase(this.userId);
    });
  }

  getTheIdDetailsFromDataBase(idValue) {
    this._expenseService.getTheDataById(idValue).subscribe((expenseRecord) => {
      expenseRecord= expenseRecord[0];
      this._projectService.getTheDataById(expenseRecord.projectId).subscribe((projectRecord) => {
        this._resourceService.getTheDataById(expenseRecord.resourceId).subscribe((resourceRecord) => {
          this.title = expenseRecord.title;
          this.amount = expenseRecord.amount;
          this.expenseDate = expenseRecord.expenseDate;
          this.expensetype = expenseRecord.expensetype;
          this.projectId = projectRecord[0].projectName;
          this.resourceId = resourceRecord[0].firstName+' '+resourceRecord[0].lastName;
          this.status = expenseRecord.status;
        })
      })
    });
  }
  revertToExpense(){
    this.router.navigate(['newdashboard/expense']);
  }
  openUpdateStatusPopUp(){
    this.UpdateStatus.show();
  }

  updateStatusInDB(value){
    this.status = value;
    this._expenseService.getTheDataById(this.userId).subscribe((expenseRecord) => {
      expenseRecord = expenseRecord[0];
      expenseRecord.status = this.status;
      this._expenseService.updateExpenses(expenseRecord).subscribe((response) => {
        this.UpdateStatus.hide();
        this._expenseService.getAllExpenses().subscribe((resp)=>{
          console.log('***********************')
          console.log(resp)
          console.log('***********************')
        })
      })
    })
  }
}
