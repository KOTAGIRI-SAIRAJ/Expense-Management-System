import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {Http, HttpModule} from '@angular/http';
import { ModalModule } from 'ngx-bootstrap';
import { routes } from './app.router';
import {DataTableModule} from "angular2-datatable"
import { MomentModule } from 'angular2-moment';
import { SelectModule } from 'ng2-select';





import { QueryApi } from './common/request/QueryApi';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ProjectAddComponent } from './project/project-add/project-add.component';
import { ProjectEditComponent } from './project/project-edit/project-edit.component';
import { ProjectViewComponent } from './project/project-view/project-view.component';
import { ProjectComponent } from './project/project.component';

import { ResourceComponent } from './resource/resource.component';
import { ResourceAddComponent } from './resource/resource-add/resource-add.component';
import { ResourceEditComponent } from './resource/resource-edit/resource-edit.component';
import { ResourceViewComponent } from './resource/resource-view/resource-view.component';

import { ExpenseComponent } from './expense/expense.component';
import { ExpenseAddComponent } from './expense/expense-add/expense-add.component';
import { ExpenseViewComponent } from './expense/expense-view/expense-view.component';
import { ExpenseEditComponent } from './expense/expense-edit/expense-edit.component';




@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,

    ProjectAddComponent,
    ProjectEditComponent,
    ProjectViewComponent,
    ProjectComponent,

    ResourceComponent,
    ResourceAddComponent,
    ResourceEditComponent,
    ResourceViewComponent,

    ExpenseComponent,
    ExpenseAddComponent,
    ExpenseViewComponent,
    ExpenseEditComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes,
    ReactiveFormsModule,
    DataTableModule,
    ModalModule.forRoot(),
    MomentModule,
    SelectModule

  ],
  providers: [QueryApi],
  bootstrap: [AppComponent]
})
export class AppModule { }
