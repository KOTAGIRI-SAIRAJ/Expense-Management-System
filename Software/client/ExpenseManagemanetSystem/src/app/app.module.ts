import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ngx-bootstrap';
import { routes } from './app.router';


import { QueryApi } from './common/request/QueryApi';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { AdminOperationsComponent } from './admin-operations/admin-operations.component';
import { ProjectAddComponent } from './project/project-add/project-add.component';
import { ProjectEditComponent } from './project/project-edit/project-edit.component';
import { ProjectViewComponent } from './project/project-view/project-view.component';
import { ProjectComponent } from './project/project.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    ExpensesComponent,
    AdminOperationsComponent,
    ProjectAddComponent,
    ProjectEditComponent,
    ProjectViewComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [QueryApi],
  bootstrap: [AppComponent]
})
export class AppModule { }
