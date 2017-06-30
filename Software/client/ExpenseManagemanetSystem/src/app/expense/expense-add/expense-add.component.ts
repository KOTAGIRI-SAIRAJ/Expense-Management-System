import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {expenseService} from "../expense.service";
import {resourceService} from "../../resource/resource.service";
import {projectService} from "../../project/project.service";
import {localStorageService} from "../../app.service";
import {projectResourceService} from "../../assined-project-resource/assigned-project-resource.service";
import {ModalDirective} from "ngx-bootstrap";



  @Component({
    selector: 'app-expense-add',
    templateUrl: './expense-add.component.html',
    styleUrls: ['./expense-add.component.css'],
    providers: [FormBuilder , expenseService, resourceService, projectService,localStorageService,projectResourceService]
  })
  export class ExpenseAddComponent implements OnInit {
    @ViewChild('popUpConfirmation') public popUpConfirmation:ModalDirective;
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
    resourceDataLocalStorage:any;
    selectedProjectsId:any;
    LoggedInPersonType = null;
    resourceIdRelatedProjectIds:Array<any> =[];
    constructor(private fb: FormBuilder,public route: Router,public _expenseService:expenseService,public _resourceService:resourceService,public _projectService:projectService,public _localStroage:localStorageService,public _projectResourceService:projectResourceService) {
      this.router = route;
      this.resourceDataLocalStorage = this._localStroage.getLocalStorageValue();
      this.LoggedInPersonType = this.resourceDataLocalStorage.role;
      this.expenseForm = this.fb.group({
        'title' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
        'amount' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
        'expenseDate' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
        'expensetype': ['', Validators.compose([Validators.required,Validators.maxLength(30)])],
        'projectId': ['', Validators.required],
          /*'resourceId': ['', Validators,],*/
        'status': ['', Validators.compose([Validators.required,Validators.maxLength(20)])]
      });
    }

    ngOnInit() {
      this._projectResourceService.getAllProjectResources().subscribe((projectResourceData)=>{
        projectResourceData.forEach((eachProjectResourceRecord)=>{
          if(eachProjectResourceRecord.resourceId === this.resourceDataLocalStorage.id){
            this.resourceIdRelatedProjectIds.push(eachProjectResourceRecord.projectId);
          }
        })
        this._projectService.getAllProjects().subscribe((projects) => {
          projects.forEach((eachRecord)=>{
            this.resourceIdRelatedProjectIds.forEach((eachProjectResourceProjectId)=>{
              if(eachProjectResourceProjectId === eachRecord.id){
                this.projectNamesforAutoCompleter.push(eachRecord.projectName);
              }
            })
            this.projectData.set(eachRecord.id, eachRecord.projectName);
          })
          this._resourceService.getAllResources().subscribe((resources) => {
            resources.forEach((eachRecord)=>{
              this.resorceNamesforAutoCompleter.push(eachRecord.firstName+' '+eachRecord.lastName)
              this.resourceData.set(eachRecord.id, eachRecord.firstName+' '+eachRecord.lastName);
            })
          })
        })
      })
    }
    expenseData(values){
      this._resourceService.getAllResources().subscribe((resourceData) => {
        resourceData.forEach((eachResource)=>{
          if(eachResource.emailId === this.resourceDataLocalStorage.emailId){
            values.resourceId = eachResource.id;
          }
        })
      })
      if(this.selectedProjectsId !== null){
        values.projectId = this.selectedProjectsId;
        this._expenseService.createExpense(values).subscribe((response) => {
          if(this.LoggedInPersonType === 'Staff'){
            this.popUpConfirmation.show();
            this.expenseForm.reset();
          }else{
            this.revertToExpense();
          }

        })
      }else{
        alert('Include atleast one project and Resource');
      }

    }
    revertToExpense(){
      this.router.navigate(['expense']);
    }
    revertToHome(){
      localStorage.clear();
      this.router.navigate(['home']);
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
    }

    public removedProject(removedValue:any):void {
      console.log('Removed Project value is: ', removedValue);
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
