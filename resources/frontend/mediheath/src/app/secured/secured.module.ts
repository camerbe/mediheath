import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecuredRoutingModule } from './secured-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SecuredRoutingModule,

    //PrimeEditorModule,


  ],

})
export class SecuredModule { }
