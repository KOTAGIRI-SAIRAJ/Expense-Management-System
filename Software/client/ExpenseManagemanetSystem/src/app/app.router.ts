/**
 * Created by semanticbit on 19/6/17.
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

import {ProjectComponent} from "./project/project.component";
import {ProjectAddComponent} from "./project/project-add/project-add.component";
import {ProjectEditComponent} from "./project/project-edit/project-edit.component";
import {ProjectViewComponent} from "./project/project-view/project-view.component";

import {ResourceComponent} from "./resource/resource.component";
import {ResourceAddComponent} from "./resource/resource-add/resource-add.component";
import {ResourceEditComponent} from "app/resource/resource-edit/resource-edit.component";
import {ResourceViewComponent} from "./resource/resource-view/resource-view.component";

import {ExpenseComponent} from "./expense/expense.component";
import {ExpenseAddComponent} from "./expense/expense-add/expense-add.component";
import {ExpenseViewComponent} from "./expense/expense-view/expense-view.component";
import {ExpenseEditComponent} from "./expense/expense-edit/expense-edit.component";
import {AssinedProjectResourceComponent} from "./assined-project-resource/assined-project-resource.component";
import {AppComponent} from "./app.component";
import {ProjectViewComponentComponent} from "./project/project-view-component/project-view-component.component";

  export const router:  Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'appComponent', component:AppComponent},
    {path: 'home', component : HomepageComponent},
    {path: 'dashboard', component : DashboardComponent},

    {path: 'expense', component : ExpenseComponent},
    {path: 'expense/create', component : ExpenseAddComponent},
    {path: 'expense/:id', component : ExpenseViewComponent},
    {path: 'expense/:id/edit', component : ExpenseEditComponent},

    {path: 'project', component : ProjectComponent},
    {path: 'project/create', component : ProjectAddComponent},
    {path: 'project/:id/edit', component : ProjectEditComponent},
    {path: 'project/:id', component : ProjectViewComponent},


    /*{path: 'project', component : ProjectComponent,
      children : [
        {path : 'create', component: ProjectAddComponent},
        {path : ':id/edit', component: ProjectEditComponent},
        {path : ':id', component: ProjectViewComponent},
      ]
    }, */

    {path: 'resource', component : ResourceComponent},
    {path: 'resource/create', component : ResourceAddComponent},
    {path: 'resource/:id/edit', component : ResourceEditComponent},
    {path: 'resource/:id', component : ResourceViewComponent},

    {path: 'project/:projectId/assignResource/:resourceId', component : AssinedProjectResourceComponent},
    {path: 'resource/:resourceId/assignProject/:projectId', component : AssinedProjectResourceComponent},

    {path:'home/projectViewComponent/:id',component: ProjectViewComponentComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);


