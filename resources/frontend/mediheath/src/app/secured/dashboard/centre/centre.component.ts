import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MetaData } from '../../../core/models/meta-data';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpiredService } from '../../../services/expired.service';
import { AuthService } from '../../../services/auth.service';
import { CentreService } from '../../../services/centre.service';
import { first } from 'rxjs';
import { CentreDetail } from '../../../core/models/centre-detail';
import { title } from 'node:process';

@Component({
  selector: 'app-centre',
  templateUrl: './centre.component.html',
  styleUrl: './centre.component.css'
})
export class CentreComponent implements OnInit {

  fb:FormBuilder=inject(FormBuilder);
  router:Router=inject(Router);
  activatedRoute:ActivatedRoute=inject(ActivatedRoute);
  expiredService:ExpiredService=inject(ExpiredService);
  authSevice:AuthService=inject(AuthService);
  centreService:CentreService=inject(CentreService);
  /**
   *
  */
 constructor() {
   this.frmCentre=this.fb.group({
     description:['',Validators.required],
     photo_1:['',Validators.required],
     photo_2:['',Validators.required],
     photo_3:['',Validators.required],
     photo_4:['',Validators.required],
     photo_5:['',Validators.required],
     metadescription:['',[Validators.required,Validators.maxLength(160)]],
     keywords:['',Validators.required],
     hashtag:['',Validators.required],
     title:['',Validators.required],
     meta:[this.metaSEO,Validators.required],
    })

  }

  frmCentre!:FormGroup
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

  get description(){
    return this.frmCentre.get("description");
  }
  get photo_1(){
    return this.frmCentre.get("photo_1");
  }
  get photo_2(){
    return this.frmCentre.get("photo_2");
  }
  get photo_3(){
    return this.frmCentre.get("photo_3");
  }
  get photo_4(){
    return this.frmCentre.get("photo_4");
  }
  get photo_5(){
    return this.frmCentre.get("photo_5");
  }
  get metadescription(){
    return this.frmCentre.get("metadescription");
  }
  get keywords(){
    return this.frmCentre.get("keywords");
  }
  get hashtag(){
    return this.frmCentre.get("hashtag");
  }
  get meta(){
    return this.frmCentre.get("meta");
  }
  get title(){
    return this.frmCentre.get("title");
  }

  onSubmit() {
    if(this.isAddMode){
      this.metaSEO={
        description: this.metadescription?.value || '',
        keywords: this.keywords?.value || '',
        hashtag: this.hashtag?.value || '',
        title: this.title?.value || '',
      };

      this.frmCentre.patchValue({
        meta:this.metaSEO
      })

      this.centreService.create(this.frmCentre.value)
      .subscribe({
        next:()=>this.router.navigate(['/secured/dashboard/centre/list']),
        error:(error)=>console.log(error)
      });
    }
    else{

      this.centreService.patch(this.id,this.frmCentre.value)
        .subscribe({
          next:()=>this.router.navigate(['/secured/dashboard/centre/list'])
        });
    }
  }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.isAddMode=!this.id;
    this.expiredService.updateState(this.authSevice.isExpired());
    this.expiredService.state$.subscribe(state =>this.isExpired=state)
    if(this.isExpired) this.authSevice.logout()
    if(!this.isAddMode){
      this.centreService.show(this.id)
          .pipe(first())
          .subscribe({
            next:data=>{
              const resData=data["data"] as CentreDetail
              this.frmCentre.patchValue(resData);

            },
            error:err=>this.erreur=err.error
          })
    }
  }

}
