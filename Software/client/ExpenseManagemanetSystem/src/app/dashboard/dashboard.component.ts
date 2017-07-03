import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {localStorageService} from "../app.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [localStorageService]
})
export class DashboardComponent implements OnInit {
  public router: Router;
  public loggedPerson:any= null;
  constructor(public route: Router,public _localStorageService:localStorageService) {
    this.router = route;
    let loggedData  = this._localStorageService.getLocalStorageValue();
    this.loggedPerson = loggedData.role;
  }

  ngOnInit() {
  }

  gotoProject(){
    this.router.navigate(['project']);
  }
  gotoResource(){
    this.router.navigate(['resource']);
  }
  revertToHome(){
    localStorage.clear();
    this.router.navigate(['home']);
  }
}
