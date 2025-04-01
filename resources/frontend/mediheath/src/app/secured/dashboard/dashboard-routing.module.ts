import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AccueilListComponent } from './accueil/accueil-list/accueil-list.component';
import { TeamTypeComponent } from './team-type/team-type.component';
import { TeamTypeListComponent } from './team-type/team-type-list/team-type-list.component';
import {teamTypeResolver} from '../../shared/resolvers/team-type.resolver';
import { homeResolver } from '../../shared/resolvers/home.resolver';
import { CentreComponent } from './centre/centre.component';
import { CentreListComponent } from './centre/centre-list/centre-list.component';
import { centreResolver } from '../../shared/resolvers/centre.resolver';

const routes: Routes = [
  {
    path:'',component:DashboardComponent,
    children:[
      {path:'teamtype',component:TeamTypeComponent},
      {path:'teamtype/list',component:TeamTypeListComponent},
      { path : "teamtype/show/:id",component:TeamTypeComponent,
        resolve : { teamtype : teamTypeResolver },
      },

      {path:'accueil',component:AccueilComponent},
      {path:'accueil/list',component:AccueilListComponent},
      { path : "accueil/show/:id",component:AccueilComponent,
        resolve : { home : homeResolver },
      },
      {path:'centre',component:CentreComponent},
      {path:'centre/list',component:CentreListComponent},
      { path : "centre/show/:id",component:CentreComponent,
        resolve : { centre : centreResolver },
      },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
