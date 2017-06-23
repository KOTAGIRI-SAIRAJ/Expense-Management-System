import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {resourceService} from "../resource.service";

@Component({
  selector: 'app-resource-view',
  templateUrl: './resource-view.component.html',
  styleUrls: ['./resource-view.component.css'],
  providers: [resourceService]
})
export class ResourceViewComponent implements OnInit {
  userId:any;
  public router: Router;
  DOB:any;emailId:any;endDate:any;firstName:any;
  joinDate:any;lastName:any;password:any;role:string;
  constructor(private activatedRoute: ActivatedRoute,public route: Router,public _resourceService:resourceService) {
    this.router = route;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['id'];
      console.log(this.userId);
      this.getTheIdDetailsFromDataBase(this.userId);
    });
  }
  getTheIdDetailsFromDataBase(idValue){
    this._resourceService.getTheDataById(idValue).subscribe((response) => {
      response = response[0];
      this.DOB = response.DOB;
      this.firstName = response.firstName;
      this.lastName = response.lastName;
      this.emailId= response.emailId;
      this.role =response.role;
      this.password = response.password;
      this.endDate = response.endDate;
      this.joinDate = response.joinDate;
    });
  }
  revertToProjects(){
    this.router.navigate(['resource']);
  }
}
