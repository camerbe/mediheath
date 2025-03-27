import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AccueilListComponent } from './accueil/accueil-list/accueil-list.component';

const routes: Routes = [
  {
    path:'',component:DashboardComponent,
    children:[
      {path:'accueil',component:AccueilComponent},
      {path:'accueil/list',component:AccueilListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
