import { TeamTypeDetail } from './../../../core/models/team-type-detail';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ExpiredService } from '../../../services/expired.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamTypeService } from '../../../services/team-type.service';
import { first } from 'rxjs';


@Component({
  selector: 'app-team-type',
  templateUrl: './team-type.component.html',
  styleUrl: './team-type.component.css'
})
export class TeamTypeComponent implements OnInit{

  fb:FormBuilder=inject(FormBuilder)
  authSevice:AuthService=inject(AuthService);
  expiredService:ExpiredService=inject(ExpiredService);
  router:Router=inject(Router);
  activatedRoute:ActivatedRoute=inject(ActivatedRoute);
  teamTypeService:TeamTypeService=inject(TeamTypeService);

  frmTeamType!:FormGroup
  isExpired!:boolean;
  id!:string;
  isAddMode!:boolean;
  erreur!:string;

  /**
   *
   */
  constructor() {
    this.frmTeamType=this.fb.group({
      name:['',[Validators.required, Validators.minLength(3)]]
    });

  }
  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.isAddMode=!this.id;
    this.expiredService.updateState(this.authSevice.isExpired());
    this.expiredService.state$.subscribe(state =>this.isExpired=state)
    if(this.isExpired) this.authSevice.logout();
    if(!this.isAddMode){
      //this.title="mise à jour de catégorie";

      this.teamTypeService.show(this.id)
        .pipe(first())
        .subscribe({
          next:data=>{
            const resData=data["data"] as TeamTypeDetail
            this.frmTeamType.patchValue(resData);

          },
          error:err=>this.erreur=err.error
        })

    }
  }
  get name(){
    return this.frmTeamType.get('name');
  }
  onSubmit() {
    if(this.isAddMode){
      this.teamTypeService.create(this.frmTeamType.value)
        .subscribe({
          next:()=>this.router.navigate(['/secured/dashboard/teamtype/list']),
          error:(error)=>console.log(error)
        });
    }
    else{

      this.teamTypeService.patch(this.id,this.frmTeamType.value)
        .subscribe({
          next:()=>this.router.navigate(['/secured/dashboard/teamtype/list'])
        });
    }
  }

}
