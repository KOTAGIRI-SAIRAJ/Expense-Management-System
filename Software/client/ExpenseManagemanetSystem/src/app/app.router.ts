/**
 * Created by semanticbit on 19/6/17.
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";

export const router:  Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component : HomepageComponent},
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);


