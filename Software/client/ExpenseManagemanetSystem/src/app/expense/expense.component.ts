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
  public router: Router;
  allResourceDetails:Array<any>=[];
  totalResourceDetails:Array<any> = [];
  constructor(public _expenseService:expenseService,public route: Router) {
    this.router = route;
    this.getTheResourcesData();
  }

  ngOnInit() {
    /*this.allResourceNamesForAutoCompleter = [];
    this._expenseService.getAllResources().subscribe(ProjectDetails=>{
      ProjectDetails.forEach((eachRecord)=>{
        let flag = 0;
        if(this.allResourceNamesForAutoCompleter.length === 0){
          this.allResourceNamesForAutoCompleter.push(eachRecord.title);
          flag =1;
        }else{
          this.allResourceNamesForAutoCompleter.forEach((eachProject)=>{
            if(eachProject === eachRecord.title){
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
    this._expenseService.getAllResources().subscribe(ResourceDetails=>{
      this.allResourceDetails =  [];
      ResourceDetails.forEach((eachRecord)=>{
        var date = new Date(eachRecord.expenseDate);
        eachRecord.expenseDate = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
        this.allResourceDetails.push(eachRecord);
      });
      this.totalResourceDetails = this.allResourceDetails;
    });
  }
}
