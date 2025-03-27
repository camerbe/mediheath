import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AccueilComponent } from './accueil/accueil.component';
import { AccueilListComponent } from './accueil/accueil-list/accueil-list.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';


@NgModule({
  declarations: [
    AccueilComponent,
    AccueilListComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    EditorModule
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },

  ],
})
export class DashboardModule { }
