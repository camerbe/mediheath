import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ReactiveFormsModule,
    PasswordModule,
    ButtonModule

  ]
})
export class PublicModule { }
