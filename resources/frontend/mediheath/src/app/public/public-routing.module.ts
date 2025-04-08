import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './layout/home/home.component';
import { CentreComponent } from './layout/centre/centre.component';
import { PoleComponent } from './layout/pole/pole.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    children:[
      {
        path:'',
        redirectTo:'home',
        pathMatch:"full"
      },
      {path:'home',component:HomeComponent},
      {path:'centre',component:CentreComponent},
      {path:'pole',component:PoleComponent},
    ]
  },
  {path:'login',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
