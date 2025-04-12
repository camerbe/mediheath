import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ExpiredService } from '../../../services/expired.service';
import { AuthService } from '../../../services/auth.service';
import { PoleService } from '../../../services/pole.service';
import { MetaData } from '../../../core/models/meta-data';
import { first } from 'rxjs';
import { PoleDetail } from '../../../core/models/pole-detail';
import { title } from 'node:process';

@Component({
  selector: 'app-pole',
  templateUrl: './pole.component.html',
  styleUrl: './pole.component.css'
})
export class PoleComponent implements OnInit {

  frmPole!:FormGroup
  isExpired!:boolean;
  isAddMode!:boolean;
  id!:string;
  erreur!:string;
  metaSEO:MetaData={
    description: '',
    keywords: '',
    hashtag: '',
    title: '',
  };


  fb:FormBuilder=inject(FormBuilder);
  router:Router=inject(Router);
  activatedRoute:ActivatedRoute=inject(ActivatedRoute);
  expiredService:ExpiredService=inject(ExpiredService);
  authSevice:AuthService=inject(AuthService);
  poleService:PoleService=inject(PoleService);

  /**
   *
  */
 constructor() {
   this.frmPole=this.fb.group({
     image:['',Validators.required],
     description:['',Validators.required],
     metadescription:['',Validators.required],
     keywords:['',Validators.required],
     hashtag:['',Validators.required],
     title:['',Validators.required],
     meta:[''],
    })

  }
  get description(){
    return this.frmPole.get("description");
  }
  get metadescription(){
    return this.frmPole.get("metadescription");
  }
  get keywords(){
    return this.frmPole.get("keywords");
  }
  get hashtag(){
    return this.frmPole.get("hashtag");
  }
  get image(){
    return this.frmPole.get("image");
  }
  get title(){
    return this.frmPole.get("title");
  }

  onSubmit() {
    if(this.isAddMode){
      this.metaSEO={
        description: this.metadescription?.value || '',
        keywords: this.keywords?.value || '',
        hashtag: this.hashtag?.value || '',
        title: this.title?.value || '',
      };

      this.frmPole.patchValue({
        meta:this.metaSEO

      })

      this.poleService.create(this.frmPole.value)
      .subscribe({
        next:()=>this.router.navigate(['/secured/dashboard/pole/list']),
        error:(error)=>console.log(error)
      });
    }
    else{
      this.metaSEO={
        description: this.metadescription?.value || '',
        keywords: this.keywords?.value || '',
        hashtag: this.hashtag?.value || '',
        title: this.title?.value || '',
      };
      this.poleService.patch(this.id,this.frmPole.value)
        .subscribe({
          next:()=>this.router.navigate(['/secured/dashboard/pole/list'])
        });
    }
  }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.isAddMode=!this.id;
    this.expiredService.updateState(this.authSevice.isExpired());
    this.expiredService.state$.subscribe(state =>this.isExpired=state);
    if(this.isExpired) this.authSevice.logout();
    if(!this.isAddMode){
          this.poleService.show(this.id)
              .pipe(first())
              .subscribe({
                next:data=>{
                  const resData = data["data"]  as PoleDetail;
                  this.frmPole.patchValue(resData);
                },
                error:err=>this.erreur=err.error
              })
        }
  }

}
