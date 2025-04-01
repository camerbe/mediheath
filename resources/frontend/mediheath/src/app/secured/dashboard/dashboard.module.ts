import { EditorModule } from 'primeng/editor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from './accueil/accueil.component';
import { AccueilListComponent } from './accueil/accueil-list/accueil-list.component';
// Ensure this is the correct library for ToastModule
import { TeamTypeComponent } from './team-type/team-type.component';
import { TeamTypeListComponent } from './team-type/team-type-list/team-type-list.component';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { SpeedDialModule } from 'primeng/speeddial';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CentreComponent } from './centre/centre.component';
import { CentreListComponent } from './centre/centre-list/centre-list.component';


@NgModule({
  declarations: [
    AccueilComponent,
    AccueilListComponent,
    TeamTypeComponent,
    TeamTypeListComponent,
    CentreComponent,
    CentreListComponent
  ],
  imports: [
    CommonModule,


    ButtonModule,
    SpeedDialModule,
    TableModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    EditorModule
  ],
  providers: [


  ],
})
export class DashboardModule { }
