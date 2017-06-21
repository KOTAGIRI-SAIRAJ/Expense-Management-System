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

export const router:  Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component : HomepageComponent},
  {path: 'expenses', component : ExpensesComponent},
  {path: 'home/adminOperations', component : AdminOperationsComponent},
  {path: 'dashboard', component : DashboardComponent},
  {path: 'project', component : ProjectComponent},
  {path: 'resource', component : ResourceComponent},
  {path: 'project/create', component : ProjectAddComponent},
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);


