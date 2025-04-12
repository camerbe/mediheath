import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpiredService } from '../../../services/expired.service';
import { AuthService } from '../../../services/auth.service';
import { MedicalTeamService } from '../../../services/medical-team.service';
import { MetaData } from '../../../core/models/meta-data';
import { first } from 'rxjs';
import { MedicalTeamDetail } from '../../../core/models/medical-team-detail';

@Component({
  selector: 'app-medical-team',
  templateUrl: './medical-team.component.html',
  styleUrl: './medical-team.component.css'
})
export class MedicalTeamComponent implements OnInit {

  frmMedicalTeam!:FormGroup
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
  medicalTeamService:MedicalTeamService=inject(MedicalTeamService);

  /**
   *
   */
  constructor() {
    this.frmMedicalTeam=this.fb.group({
      titre:['',Validators.required],
      doctor_1:['',Validators.required],
      image_doctor_1:['',Validators.required],
      doctor_2:['',Validators.required],
      image_doctor_2:['',Validators.required],
      doctor_3:['',Validators.required],
      image_doctor_3:['',Validators.required],
      doctor_4:['',Validators.required],
      image_doctor_4:['',Validators.required],
      doctor_5:['',Validators.required],
      image_doctor_5:['',Validators.required],
      metadescription:['',[Validators.maxLength(160)]],
      keywords:[''],
      hashtag:[''],
      meta:[this.metaSEO],
    })

  }

  get doctor_1(){
    return this.frmMedicalTeam.get("doctor_1");
  }
  get doctor_2(){
    return this.frmMedicalTeam.get("doctor_2");
  }
  get doctor_3(){
    return this.frmMedicalTeam.get("doctor_3");
  }
  get doctor_4(){
    return this.frmMedicalTeam.get("doctor_4");
  }

  get doctor_5(){
    return this.frmMedicalTeam.get("doctor_5");
  }

  get image_doctor_1(){
    return this.frmMedicalTeam.get("image_doctor_1");
  }
  get image_doctor_2(){
    return this.frmMedicalTeam.get("image_doctor_2");
  }
  get image_doctor_3(){
    return this.frmMedicalTeam.get("image_doctor_3");
  }
  get image_doctor_4(){
    return this.frmMedicalTeam.get("image_doctor_4");
  }
  get image_doctor_5(){
    return this.frmMedicalTeam.get("image_doctor_5");
  }
  get metadescription(){
    return this.frmMedicalTeam.get("metadescription");
  }
  get keywords(){
    return this.frmMedicalTeam.get("keywords");
  }
  get hashtag(){
    return this.frmMedicalTeam.get("hashtag");
  }
  get titre(){
    return this.frmMedicalTeam.get("titre");
  }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.isAddMode=!this.id;
    this.expiredService.updateState(this.authSevice.isExpired());
    this.expiredService.state$.subscribe(state =>this.isExpired=state);
    if(this.isExpired) this.authSevice.logout();
    if(!this.isAddMode){
      this.medicalTeamService.show(this.id)
          .pipe(first())
          .subscribe({
            next:data=>{
              const resData = data["data"]  as MedicalTeamDetail;
              this.frmMedicalTeam.patchValue(resData);
            },
            error:err=>this.erreur=err.error
          })
    }
  }
  onSubmit() {
    if(this.isAddMode){
      this.metaSEO={
        description: this.metadescription?.value || '',
        keywords: this.keywords?.value || '',
        hashtag: this.hashtag?.value || '',
        title: this.titre?.value || '',
      };

      this.frmMedicalTeam.patchValue({
        meta:this.metaSEO

      })

      this.medicalTeamService.create(this.frmMedicalTeam.value)
      .subscribe({
        next:()=>this.router.navigate(['/secured/dashboard/medical/list']),
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
      this.frmMedicalTeam.patchValue({
        meta:this.metaSEO
      })
      this.medicalTeamService.patch(this.id,this.frmMedicalTeam.value)
        .subscribe({
          next:()=>this.router.navigate(['/secured/dashboard/medical/list'])
        });
    }
  }



}
