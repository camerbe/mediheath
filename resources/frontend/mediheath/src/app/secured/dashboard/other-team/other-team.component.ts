import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MetaData } from '../../../core/models/meta-data';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpiredService } from '../../../services/expired.service';
import { AuthService } from '../../../services/auth.service';
import { OtherTeamService } from '../../../services/other-team.service';
import { first } from 'rxjs';
import { OtherTeamDetail } from '../../../core/models/other-team-detail';

@Component({
  selector: 'app-other-team',
  templateUrl: './other-team.component.html',
  styleUrl: './other-team.component.css'
})
export class OtherTeamComponent implements OnInit {


  frmOtherTeam!:FormGroup
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
  otherTeamService:OtherTeamService=inject(OtherTeamService);
  constructor()
  {
    this.frmOtherTeam=this.fb.group({
      titre:['',Validators.required],
      doctor_1:['',Validators.required],
      image_doctor_1:['',Validators.required],
      doctor_2:['',Validators.required],
      image_doctor_2:['',Validators.required],
      doctor_3:['',Validators.required],
      image_doctor_3:['',Validators.required],
      metadescription:['',[Validators.maxLength(160)]],
      keywords:[''],
      hashtag:[''],
      meta:[this.metaSEO],
    });
  }

  get doctor_1(){
    return this.frmOtherTeam.get("doctor_1");
  }
  get doctor_2(){
    return this.frmOtherTeam.get("doctor_2");
  }
  get doctor_3(){
    return this.frmOtherTeam.get("doctor_3");
  }


  get image_doctor_1(){
    return this.frmOtherTeam.get("image_doctor_1");
  }
  get image_doctor_2(){
    return this.frmOtherTeam.get("image_doctor_2");
  }
  get image_doctor_3(){
    return this.frmOtherTeam.get("image_doctor_3");
  }

  get metadescription(){
    return this.frmOtherTeam.get("metadescription");
  }
  get keywords(){
    return this.frmOtherTeam.get("keywords");
  }
  get hashtag(){
    return this.frmOtherTeam.get("hashtag");
  }
  get titre(){
    return this.frmOtherTeam.get("titre");
  }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.isAddMode=!this.id;
    this.expiredService.updateState(this.authSevice.isExpired());
    this.expiredService.state$.subscribe(state =>this.isExpired=state);
    if(this.isExpired) this.authSevice.logout();
    if(!this.isAddMode){
      this.otherTeamService.show(this.id)
          .pipe(first())
          .subscribe({
            next:data=>{
              const resData = data["data"]  as OtherTeamDetail;
              this.frmOtherTeam.patchValue({
                metadescription:resData.meta.description,
                keywords:resData.meta.keywords,
                hashtag:resData.meta.hashtag
              });
              this.frmOtherTeam.patchValue(resData);
            },
              error:err=>this.erreur=err.error
          })
    }
  }

  // Add any additional methods or properties as needed
  onSubmit() {
    if(this.isAddMode){
      this.metaSEO={
        description: this.metadescription?.value || '',
        keywords: this.keywords?.value || '',
        hashtag: this.hashtag?.value || '',
        title: this.titre?.value || '',
      };

      this.frmOtherTeam.patchValue({
        meta:this.metaSEO

      })

      this.otherTeamService.create(this.frmOtherTeam.value)
      .subscribe({
        next:()=>this.router.navigate(['/secured/dashboard/other/list']),
        error:(error)=>console.log(error)
      });
    }
    else {
      this.metaSEO={
        description: this.metadescription?.value || '',
        keywords: this.keywords?.value || '',
        hashtag: this.hashtag?.value || '',
        title: this.titre?.value || '',
      };
      this.frmOtherTeam.patchValue({
        meta:this.metaSEO
      })
      this.otherTeamService.patch(this.id,this.frmOtherTeam.value)
        .subscribe({
          next:()=>this.router.navigate(['/secured/dashboard/other/list'])
        });
    }
  }

}
