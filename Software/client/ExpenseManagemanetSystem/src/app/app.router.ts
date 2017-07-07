/**
 * Created by semanticbit on 19/6/17.
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";


import {ProjectComponent} from "./project/project.component";
import {ProjectAddComponent} from "./project/project-add/project-add.component";
import {ProjectEditComponent} from "./project/project-edit/project-edit.component";


import {ResourceComponent} from "./resource/resource.component";
import {ResourceAddComponent} from "./resource/resource-add/resource-add.component";
import {ResourceEditComponent} from "app/resource/resource-edit/resource-edit.component";
import {ResourceViewComponent} from "./resource/resource-view/resource-view.component";

import {ExpenseComponent} from "./expense/expense.component";
import {ExpenseAddComponent} from "./expense/expense-add/expense-add.component";
import {ExpenseViewComponent} from "./expense/expense-view/expense-view.component";
import {ExpenseEditComponent} from "./expense/expense-edit/expense-edit.component";

import {AppComponent} from "./app.component";

import {DashBoardNewComponent} from "./dash-board-new/dash-board-new.component";
import {MyexpensesComponent} from "./expense/myexpenses/myexpenses.component";
import {PrjectviewComponent} from "./project/prjectview/prjectview.component";

  export const router:  Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'appComponent', component:AppComponent},
    {path: 'home', component : HomepageComponent},


    {path: 'expense/:id/edit', component : ExpenseEditComponent},

    {path: 'dashboard',component:DashBoardNewComponent,
      children : [
        {path : 'project', component: ProjectComponent},
        {path: 'project/create', component : ProjectAddComponent},
        {path: 'project/:id/edit', component : ProjectEditComponent},
        {path: 'project/:id', component : PrjectviewComponent},

        {path: 'resource', component : ResourceComponent},
        {path: 'resource/create', component : ResourceAddComponent},
        {path: 'resource/:id/edit', component : ResourceEditComponent},
        {path: 'resource/:id', component : ResourceViewComponent},

        {path: 'expense', component : ExpenseComponent},
        {path: 'expense/create', component : ExpenseAddComponent},
        {path: 'expense/:id', component : ExpenseViewComponent},
        {path: 'myexpenses', component : MyexpensesComponent},
      ]
    }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);


