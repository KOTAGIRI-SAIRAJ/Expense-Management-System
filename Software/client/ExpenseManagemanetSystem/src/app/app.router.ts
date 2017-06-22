/**
 * Created by semanticbit on 19/6/17.
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {ExpensesComponent} from "./expenses/expenses.component";
import {AdminOperationsComponent} from "./admin-operations/admin-operations.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProjectComponent} from "./project/project.component";
import {ResourceComponent} from "./resource/resource.component";
import {ProjectAddComponent} from "./project/project-add/project-add.component";
import {ResourceAddComponent} from "./resource/resource-add/resource-add.component";
import {ProjectEditComponent} from "./project/project-edit/project-edit.component";
import {ProjectViewComponent} from "./project/project-view/project-view.component";

export const router:  Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component : HomepageComponent},
  {path: 'expenses', component : ExpensesComponent},
  {path: 'home/adminOperations', component : AdminOperationsComponent},
  {path: 'dashboard', component : DashboardComponent},
  {path: 'project/create', component : ProjectAddComponent},
  {path: 'project/:id/edit', component : ProjectEditComponent},
  {path: 'project', component : ProjectComponent},
  /*{path: 'project', component : ProjectComponent,
    children : [
      {path : 'create', component: ProjectAddComponent},
      {path : ':id/edit', component: ProjectEditComponent},
      {path : ':id', component: ProjectViewComponent},
    ]
  },*/
  {path: 'resource', component : ResourceComponent},

  {path: 'resource/create', component : ResourceAddComponent},


];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);


