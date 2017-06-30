import {Component, OnInit} from '@angular/core';
import {HomepageComponent} from "./homepage/homepage.component";
import {ProjectComponent} from "./project/project.component";
import {FooterComponent} from "./footer/footer.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[HomepageComponent,ProjectComponent,FooterComponent]
})
export class AppComponent implements OnInit{
  title = 'Welcome to Expense Management System...!!!';
  ngOnInit() {
    localStorage.clear();
  }
}
