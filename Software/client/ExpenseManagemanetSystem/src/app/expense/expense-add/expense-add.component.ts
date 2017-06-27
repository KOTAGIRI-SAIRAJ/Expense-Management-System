import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {expenseService} from "../expense.service";
import {router} from "../../app.router";
import {resourceService} from "../../resource/resource.service";
import {projectService} from "../../project/project.service";
import {isUndefined} from "util";


  @Component({
    selector: 'app-expense-add',
    templateUrl: './expense-add.component.html',
    styleUrls: ['./expense-add.component.css'],
    providers: [FormBuilder , expenseService, resourceService, projectService]
  })
  export class ExpenseAddComponent implements OnInit {
    expenseForm : FormGroup;
    public router: Router;
    private value:any = ['Athens'];
    private _disabledV:string = '0';
    private disabled:boolean = false;
    projectNamesforAutoCompleter:Array<any> = [];
    resorceNamesforAutoCompleter:Array<any> = [];
    projectData : Map<number, string> = new Map<number, string>();
    resourceData : Map<number, string> = new Map<number, string>();
    selectedProjects:Array<any> = [];
    selectedResources:Array<any> = [];
    selectedProjectsId:any;
    constructor(private fb: FormBuilder,public route: Router,public _expenseService:expenseService,public _resourceService:resourceService,public _projectService:projectService) {
      this.router = route;
      this.expenseForm = this.fb.group({
        'title' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
        'amount' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
        'expenseDate' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
        'expensetype': ['', Validators.compose([Validators.required,Validators.maxLength(30)])],
        'projectId': ['', Validators,],
        'resourceId': ['', Validators,],
        'status': ['', Validators.compose([Validators.required,Validators.maxLength(20)])]
      });
    }

    ngOnInit() {
      this._projectService.getAllProjects().subscribe((projects) => {
          projects.forEach((eachRecord)=>{
            this.projectNamesforAutoCompleter.push(eachRecord.projectName);
            this.projectData.set(eachRecord.id, eachRecord.projectName);
          })
        this._resourceService.getAllResources().subscribe((resources) => {
          resources.forEach((eachRecord)=>{
            this.resorceNamesforAutoCompleter.push(eachRecord.firstName+' '+eachRecord.lastName)
            this.resourceData.set(eachRecord.id, eachRecord.firstName+' '+eachRecord.lastName);
          })
        })
      })

    }
    expenseData(values){
      console.log(values)
      if(this.selectedProjectsId !== null){
        values.projectId = this.selectedProjectsId;
        this._expenseService.createExpense(values).subscribe((response) => {
          this.revertToExpense();
        })
      }else{
        alert('Include atleast one project and Resource');
      }
    }
    revertToExpense(){
      this.router.navigate(['expense']);
    }
    private get disabledV():string {
      return this._disabledV;
    }

    private set disabledV(value:string) {
      this._disabledV = value;
      this.disabled = this._disabledV === '1';
    }

    public selectedProject(SelectedValue:any):void {

      this.projectData.forEach((value: string, key: number) => {

        if(SelectedValue.id === value){
          this.selectedProjectsId = key;
        }
      })

      /*this.selectedProjects.push(value.id)
      console.log(this.selectedProjects)
      this.projectData.forEach((value: string, key: number) => {
        console.log("here is " + key + ', ' + value);
        this.selectedProjects.forEach((eachSelectedProject)=>{
          if(eachSelectedProject === value){
            this.selectedProjectsIds.push(key);
          }
        })
      });
      console.log(this.selectedProjectsIds);*/
    }

    public removedProject(removedValue:any):void {
      console.log('Removed Project value is: ', removedValue);
      /*this.selectedProjects.forEach((eachProject,index)=>{
        if(eachProject === value.id){
          this.selectedProjects.splice(index,1);
        }
      })*/
      /*this.selectedProjectsIds = [];
      this.projectData.forEach((value: string, key: number) => {
        console.log("here is " + key + ', ' + value);
        this.selectedProjects.forEach((eachSelectedProject)=>{
          if(eachSelectedProject === value){
            this.selectedProjectsIds.push(key);
          }
        })
      });
      console.log(this.selectedProjectsIds);*/
      this.selectedProjectsId = null;


    }
    public selectedResource(value:any):void {

      this.selectedResources.push(value.id);

    }

    public removedResource(value:any):void {

      this.selectedResources.forEach((eachResource,index)=>{
        if(eachResource === value.id){
          this.selectedResources.splice(index,1);
        }
      })

    }

  }
