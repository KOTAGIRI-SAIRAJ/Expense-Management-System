import {Component, OnInit, ViewChild} from '@angular/core';
import {resourceService} from "./resource.service";
import {ModalDirective} from "ngx-bootstrap";
import {Router} from '@angular/router';
import {localStorageService} from "../app.service";

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css'],
  providers :[resourceService,localStorageService]
})
export class ResourceComponent implements OnInit {
  private value: any = {};private _disabledV = '0';
  private disabled = false;
  public router: Router;
  public allResourceDetails:Array<any> = [];
  tempResourceDetails:any;
  tempEmailId:string = '';
  LoggedInPersonType = '';
  public totalResourceDetails:Array<any> =[];
  public allResourceNamesForAutoCompleter:Array<any>;
  @ViewChild('DeleteResourceDetails') public DeleteResourceDetails:ModalDirective;
  constructor(public _resourceService:resourceService,public route: Router,public _localStorage:localStorageService) {
    let loggedInInfo = this._localStorage.getLocalStorageValue();
    this.LoggedInPersonType = loggedInInfo.role;
    this.router = route;
    this.getTheResourceData();
  }

  ngOnInit() {
    this.allResourceNamesForAutoCompleter = [];
    this._resourceService.getAllResources().subscribe(ResourceDetails=>{
      ResourceDetails.forEach((eachRecord)=>{
        let flag = 0;
        if(this.allResourceNamesForAutoCompleter.length === 0){
          this.allResourceNamesForAutoCompleter.push(eachRecord.firstName+' '+eachRecord.lastName);
          flag =1;
        }else{
          this.allResourceNamesForAutoCompleter.forEach((eachProject)=>{
            if(eachProject === eachRecord.projectName){
              flag =1;
            }
          })
        }
        if(flag === 0){
          this.allResourceNamesForAutoCompleter.push(eachRecord.firstName+' '+eachRecord.lastName);
        }
      })
    })

  }
  getTheResourceData(){
    this.allResourceDetails =  [];
    this._resourceService.getAllResources().subscribe(ResourceDetails=>{
      ResourceDetails.forEach((eachRecord)=>{
        let date = new Date(eachRecord.DOB);
        eachRecord.DOB = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
        date = new Date(eachRecord.joinDate);
        eachRecord.joinDate = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
        date = new Date(eachRecord.endDate);
        eachRecord.endDate = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
        this.allResourceDetails.push(eachRecord);
      });
    });
    this.totalResourceDetails = this.allResourceDetails;
  }

  ViewResourcedata(values){

    this.router.navigate(['resource/'+values.id]);
  }

  EditResourceData(values){
    this.router.navigate(['resource/'+values.id+'/edit']);
  }

  DeleteResourceData(values){
    this._resourceService.deleteTheResourceRecord(values.id).subscribe(Resource=>{
      console.log('Sucessfully Deleted');
      this.getTheResourceData();
    });
    this.hideDeleteResourceDetails();
  }
  deleteResourceData = (Data):void =>{
    this.tempResourceDetails = Data;
    this.tempEmailId = Data.emailId;

    this.DeleteResourceDetails.show();
  };
  public hideDeleteResourceDetails = ():void =>{
    this.DeleteResourceDetails.hide();
  };

  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value: any): void {

    this.updateDataTable(value.id);
  }

  public removed(value: any): void {


  }

  public typed(value: any): void {

  }

  public refreshValue(value: any): void {
    this.value = value;
  }

  updateDataTable(fromAutoCompleter){

    let SplittedValue = fromAutoCompleter.split(' ');

    let tempResourceDetailsarray = this.totalResourceDetails;
    tempResourceDetailsarray.forEach((eachRecord)=>{
      if(eachRecord.firstName === SplittedValue[0] && eachRecord.lastName === SplittedValue[1]){
        this.allResourceDetails = [];
        this.allResourceDetails.push(eachRecord);
      }
    })
  }
  revertToDashBoard(){
    this.router.navigate(['newdashboard/dashboard']);
  }
  revertToExpense(){
    this.router.navigate(['newdashboard/expense']);
  }
}
