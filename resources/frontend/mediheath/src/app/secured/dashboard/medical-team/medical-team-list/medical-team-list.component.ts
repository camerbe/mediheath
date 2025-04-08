import { Component, inject, OnInit } from '@angular/core';
import { MedicalTeamDetail } from '../../../../core/models/medical-team-detail';
import { ExpiredService } from '../../../../services/expired.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalTeamService } from '../../../../services/medical-team.service';
import { AuthService } from '../../../../services/auth.service';
import { MedicalTeam } from '../../../../core/models/medical-team';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medical-team-list',
  templateUrl: './medical-team-list.component.html',
  styleUrl: './medical-team-list.component.css'
})
export class MedicalTeamListComponent implements OnInit {


  medicalTeams:MedicalTeamDetail[]=[];
  medicalTeam!:MedicalTeamDetail;
  id!:string;
  isAddMode!:boolean
  isExpired!:boolean;
  image!:string;

  expiredService:ExpiredService=inject(ExpiredService);
  router:Router=inject(Router);
  activatedRoute:ActivatedRoute=inject(ActivatedRoute);
  medicalTeamService:MedicalTeamService=inject(MedicalTeamService);
  authService:AuthService=inject(AuthService);

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.isAddMode=!this.id;
    this.expiredService.updateState(this.authService.isExpired());
    this.expiredService.state$.subscribe(state=>this.isExpired=state);
    if(this.isExpired) this.authService.logout();
    this.medicalTeamService.getAll()
        .subscribe({
          next:(data)=>{
            const tempData=data as unknown as MedicalTeam;
            this.medicalTeams=tempData["data"] as unknown as MedicalTeamDetail[];
          }
        })
  }
  editMedicalTeam(id: string) {
    this.router.navigate(['/secured/dashboard/medical/show',id])
  }
  deleteMedicalTeam(id: string) {
    const swalWithTailwindButtons=Swal.mixin({
          customClass:{
              container: 'bg-gray-800',
              popup: 'rounded-lg p-4 shadow-lg',
              title: 'text-2xl font-bold text-gray-600',
                    //content: 'text-md text-gray-200',
              confirmButton: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
                    cancelButton: 'mr-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
                  },
                  buttonsStyling: false
                })
                swalWithTailwindButtons.fire({
                  title: 'Êtes-vous sûr?',
                  text: "De vouloir supprimer ce medicla team!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Supprimer',
                  cancelButtonText: 'Annuler ',
                  reverseButtons: true
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.medicalTeamService.delete(id)
                    .subscribe({
                      next: () => {
                        this.medicalTeams = this.medicalTeams.filter((medicalTeam) => medicalTeam.id !== id);

                      },
                      error:()=>() => { }
                    })
                    swalWithTailwindButtons.fire(
                      'Supprimé!',
                      'Le Medical Team a été supprimé.',
                      'success'
                    )
                  }
                }
              );
  }
  addMedicalTeam() {
    this.router.navigate(['/secured/dashboard/medical'])
  }

}
