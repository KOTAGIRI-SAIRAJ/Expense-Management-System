import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public router: Router;
  constructor(public route: Router) {
    this.router = route;
  }

  ngOnInit() {
  }
  gotoProject(){
    this.router.navigate(['project']);
  }
  gotoResource(){
    this.router.navigate(['resource']);
  }
}
