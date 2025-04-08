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
import { PoleComponent } from './pole/pole.component';
import { PoleListComponent } from './pole/pole-list/pole-list.component';
import { poleResolver } from '../../shared/resolvers/pole.resolver';
import { medicalTeamResolver } from '../../shared/resolvers/medical-team.resolver';
import { otherTeamResolver } from '../../shared/resolvers/other-team.resolver';
import { OtherTeamComponent } from './other-team/other-team.component';
import { OtherTeamListComponent } from './other-team/other-team-list/other-team-list.component';
import { MedicalTeamComponent } from './medical-team/medical-team.component';
import { MedicalTeamListComponent } from './medical-team/medical-team-list/medical-team-list.component';

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
      {path:'pole',component:PoleComponent},
      {path:'pole/list',component:PoleListComponent},
      { path : "pole/show/:id",component:PoleComponent,
        resolve : { pole : poleResolver },
      },

      {path:'medical',component:MedicalTeamComponent},
      {path:'medical/list',component:MedicalTeamListComponent},
      { path : "medical/show/:id",component:MedicalTeamComponent,
        resolve : { medical : medicalTeamResolver },
      },

      {path:'other',component:OtherTeamComponent},
      {path:'other/list',component:OtherTeamListComponent},
      { path : "other/show/:id",component:OtherTeamComponent,
        resolve : { other : otherTeamResolver },
      },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
