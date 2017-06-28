import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {expenseService} from "../expense.service";
import {projectService} from "../../project/project.service";
import {resourceService} from "../../resource/resource.service";

@Component({
  selector: 'app-expense-edit',
  templateUrl: './expense-edit.component.html',
  styleUrls: ['./expense-edit.component.css'],
  providers:[FormBuilder,expenseService,projectService,resourceService]
})
export class ExpenseEditComponent implements OnInit {
  expenseForm : FormGroup;
  public router: Router;
  public disabled: any;
  userId:any;
  title:any;amount:number;expenseDate:Date;expensetype:any;
  projectId:any;resourceId:any;status:any;
  projectNamesforAutoCompleter:Array<any> =[];
  selectedProjectvalue:any=[];
  autocompleterSelectedProject:any;
  resourceDetailsTotal:Array<any> = [];
  constructor(private fb: FormBuilder,public route: Router,public _expenseService:expenseService,private activatedRoute: ActivatedRoute,public _projectService:projectService,public _resourceService:resourceService) {
    this.router = route;
  }

  ngOnInit() {
    this.expenseForm = this.fb.group({
      'title' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'amount' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'expenseDate' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'expensetype': ['', Validators.compose([Validators.required,Validators.maxLength(30)])],
      'projectId': ['', Validators.required],
      'resourceId': ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'status': ['', Validators.compose([Validators.required,Validators.maxLength(20)])]
    });
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.getTheIdDetailsFromDataBase(this.userId);
    });
    this._projectService.getAllProjects().subscribe((allProjectRecords)=>{
      allProjectRecords.forEach((eachProjectRecord)=>{
        this.projectNamesforAutoCompleter.push(eachProjectRecord.projectName);
      })
    })
    this._resourceService.getAllResources().subscribe(resourceDetails=>{
      this.resourceDetailsTotal = resourceDetails;
    });
  }
  expenseData(values){
    if(this.autocompleterSelectedProject != null){
      values.id = this.userId;
      this._projectService.getAllProjects().subscribe((allProjectRecords)=>{
        allProjectRecords.forEach((eachProject)=>{
          if(eachProject.projectName === this.autocompleterSelectedProject){
            values.projectId = eachProject.id;
          }
        })
        this._expenseService.updateExpenses(values).subscribe((response) => {
          this.revertToExpense();
        })
      })
    }else{
      alert('enter at least one project');
    }

  }
  revertToExpense(){
    this.router.navigate(['expense']);
  }
  getTheIdDetailsFromDataBase(idValue){
    this._expenseService.getTheDataById(idValue).subscribe((expenseRecord) => {
      expenseRecord = expenseRecord[0];
      this._projectService.getTheDataById(expenseRecord.projectId).subscribe((projectRecord) => {
        this._resourceService.getTheDataById(expenseRecord.resourceId).subscribe((resourceRecord) => {

          this.title= expenseRecord.title;
          this.amount= expenseRecord.amount;
          this.expenseDate = expenseRecord.expenseDate;
          this.expensetype= expenseRecord.expensetype;
          const obj = {id:  projectRecord[0].projectName,text: projectRecord[0].projectName};
          this.selectedProjectvalue.push(obj)
          this.resourceId =  resourceRecord[0].firstName+' '+resourceRecord[0].lastName;
          console.log(this.resourceId);
          this.status = expenseRecord.status;
          this.autocompleterSelectedProject = projectRecord[0].projectName;
          this.expenseForm.controls['projectId'].setValue(this.selectedProjectvalue);
          this.expenseForm.controls['title'].setValue(this.title);
          this.expenseForm.controls['amount'].setValue(this.amount);
          this.expenseForm.controls['expenseDate'].setValue(this.expenseDate);
          this.expenseForm.controls['expensetype'].setValue(this.expensetype);
          this.expenseForm.controls['resourceId'].setValue(this.resourceId);
          this.expenseForm.controls['status'].setValue(this.status);
        })
      })
    });
  }
  public selectedProject(SelectedValue:any):void {
      this.autocompleterSelectedProject = SelectedValue.id;
  }
  public removedProject(removedValue:any):void {
    this.autocompleterSelectedProject = null;
  }
}
