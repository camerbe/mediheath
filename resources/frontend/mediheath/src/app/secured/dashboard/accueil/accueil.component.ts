import { HomeService } from './../../../services/home.service';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ExpiredService } from '../../../services/expired.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { HomeDetail } from '../../../core/models/home-detail';
import { MetaData } from '../../../core/models/meta-data';
import { Home } from '../../../core/models/home';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit{

  frmHome!:FormGroup;
  isExpired!:boolean;
  isAddMode!:boolean;
  id!:string;
  erreur!:string;
  metaSEO:MetaData={
    description: '',
    keywords: '',
    hashtag: ''
  };

  fb:FormBuilder=inject(FormBuilder);
  homeService:HomeService=inject(HomeService);
  authSevice:AuthService=inject(AuthService);
  expiredService:ExpiredService=inject(ExpiredService);
  router:Router=inject(Router);
  activatedRoute:ActivatedRoute=inject(ActivatedRoute);

  /**
   *
  */
 constructor() {
   this.frmHome=this.fb.group({
     location:['',Validators.required],
     open_hour:['',Validators.required],
     doctor_description:['',Validators.required],
     doctor_image:['',Validators.required],
     description:['',[Validators.required,Validators.maxLength(160)]],
     keywords:['',Validators.required],
     hashtag:['',Validators.required],
     meta:[this.metaSEO,Validators.required],
    });
  }

  get location(){
    return this.frmHome.get("location");
  }
  get open_hour(){
    return this.frmHome.get("open_hour");
  }
  get doctor_description(){
    return this.frmHome.get("doctor_description");
  }
  get doctor_image(){
    return this.frmHome.get("doctor_image");
  }
  get description(){
    return this.frmHome.get("description");
  }
  get keywords(){
    return this.frmHome.get("keywords");
  }
  get hashtag(){
    return this.frmHome.get("hashtag");
  }
  get meta(){
    return this.frmHome.get("meta");
  }

  onSubmit() {
    if(this.isAddMode){
      this.metaSEO={
        description: this.description?.value || '',
        keywords: this.keywords?.value || '',
        hashtag: this.hashtag?.value || ''
      };

      this.frmHome.patchValue({
        meta:this.metaSEO
      })

      this.homeService.create(this.frmHome.value)
      .subscribe({
        next:()=>this.router.navigate(['/secured/dashboard/accueil/list']),
        error:(error)=>console.log(error)
      });
    }
    else{

      this.homeService.patch(this.id,this.frmHome.value)
        .subscribe({
          next:()=>this.router.navigate(['/secured/dashboard/accueil/list'])
        });
    }

  }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.isAddMode=!this.id;
    this.expiredService.updateState(this.authSevice.isExpired());
    this.expiredService.state$.subscribe(state =>this.isExpired=state)
    if(this.isExpired) this.authSevice.logout();
    if(!this.isAddMode){
          //this.title="mise à jour de catégorie";

          this.homeService.show(this.id)
            .pipe(first())
            .subscribe({
              next:data=>{
                const resData=data["data"] as HomeDetail
                this.frmHome.patchValue(resData);

              },
              error:err=>this.erreur=err.error
            })

    }
  }
}
