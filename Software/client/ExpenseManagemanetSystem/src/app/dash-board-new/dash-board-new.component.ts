import { Component, OnInit } from '@angular/core';
import {localStorageService} from "../app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dash-board-new',
  templateUrl: './dash-board-new.component.html',
  styleUrls: ['./dash-board-new.component.css'],
  providers: [localStorageService]
})
export class DashBoardNewComponent implements OnInit {
  public LoggedInPersonName:any;
  public LoggedInPersonType:any;
  public router: Router;
  constructor(public _localStorageService:localStorageService,public route: Router) {
    this.router = route;
    let totLocalStorageData= this._localStorageService.getLocalStorageValue();
    console.log(totLocalStorageData);
    this.LoggedInPersonName = totLocalStorageData.firstName+' '+totLocalStorageData.lastName;
    this.LoggedInPersonType = totLocalStorageData.role;
  }

  ngOnInit() {
  }
  revertToHome(){
    localStorage.clear();
    this.router.navigate(['home']);
  }
}
