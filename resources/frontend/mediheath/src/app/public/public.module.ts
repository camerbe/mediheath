import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { LayoutComponent } from './layout/layout.component'; // Ensure this path is correct and the component is exported properly
import { SplitterModule } from 'primeng/splitter';
import { HomeComponent } from './layout/home/home.component';
// Uncomment the following line if ToggleButtonModule exists in the library
// import { ToggleButtonModule } from 'primeng/togglebutton';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
// Uncomment the following line if MenuModule exists in the library
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { CentreComponent } from './layout/centre/centre.component';
import { ImageModule } from 'primeng/image';
import { TagModule } from 'primeng/tag';
import { PoleComponent } from './layout/pole/pole.component';
import { MessagesModule } from 'primeng/messages';
import { MedicalTeamComponent } from './layout/medical-team/medical-team.component';
import { OtherTeamComponent } from './layout/other-team/other-team.component';
import { TimelineModule } from 'primeng/timeline';
import { HeaderComponent } from './layout/components/header/header.component';


@NgModule({
  declarations: [
    LoginComponent,
    LayoutComponent,
    HomeComponent,
    CentreComponent,
    PoleComponent,
    MedicalTeamComponent,
    OtherTeamComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ReactiveFormsModule,
    PasswordModule,
    ButtonModule,
    SplitterModule,
    CardModule,
    MenuModule,
    MenubarModule,
    TagModule,
    DividerModule,
    ImageModule,
    MessagesModule,
    TimelineModule

  ]
})
export class PublicModule { }
