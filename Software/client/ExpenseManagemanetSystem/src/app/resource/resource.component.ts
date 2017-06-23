import {Component, OnInit, ViewChild} from '@angular/core';
import {resourceService} from "./resource.service";
import {ModalDirective} from "ngx-bootstrap";
import {Router} from '@angular/router';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css'],
  providers :[resourceService]
})
export class ResourceComponent implements OnInit {
  public router: Router;
  public allResourceDetails:Array<any> = [];
  tempResourceDetails:any;
  tempEmailId:string = '';
  @ViewChild('DeleteResourceDetails') public DeleteResourceDetails:ModalDirective;
  constructor(public _resourceService:resourceService,public route: Router) {
    this.router = route;
    this.getTheResourceData();
  }

  ngOnInit() {
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
    console.log(this.tempResourceDetails);
    this.DeleteResourceDetails.show();
  };
  public hideDeleteResourceDetails = ():void =>{
    this.DeleteResourceDetails.hide();
  };
}
