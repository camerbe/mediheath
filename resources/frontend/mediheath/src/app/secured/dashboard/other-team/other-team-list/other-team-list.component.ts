import { Component, inject, OnInit } from '@angular/core';
import { OtherTeamDetail } from '../../../../core/models/other-team-detail';
import { ExpiredService } from '../../../../services/expired.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OtherTeamService } from '../../../../services/other-team.service';
import { AuthService } from '../../../../services/auth.service';
import { OtherTeam } from '../../../../core/models/other-team';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-other-team-list',
  templateUrl: './other-team-list.component.html',
  styleUrl: './other-team-list.component.css'
})
export class OtherTeamListComponent implements OnInit {


  otherTeams:OtherTeamDetail[]=[];
  otherTeam!:OtherTeamDetail;
  id!:string;
  isAddMode!:boolean
  isExpired!:boolean;
  image!:string;

  expiredService:ExpiredService=inject(ExpiredService);
  router:Router=inject(Router);
  activatedRoute:ActivatedRoute=inject(ActivatedRoute);
  otherTeamService:OtherTeamService=inject(OtherTeamService);
  authService:AuthService=inject(AuthService);
  constructor() { }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.isAddMode=!this.id;
    this.expiredService.updateState(this.authService.isExpired());
    this.expiredService.state$.subscribe(state=>this.isExpired=state);
    if(this.isExpired) this.authService.logout();
    this.otherTeamService.getAll()
      .subscribe({
        next:(data)=>{
              const tempData=data as unknown as OtherTeam;
              this.otherTeams=tempData["data"] as unknown as OtherTeamDetail[];
        }
    })
  }

  editOtherTeam(id: string) {
    this.router.navigate(['/secured/dashboard/other/show',id])
  }
  deleteOtherTeam(id: string) {
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
              text: "De vouloir supprimer ce other team!",
              icon: 'warning',
                    showCancelButton: true,
                      confirmButtonText: 'Supprimer',
                      cancelButtonText: 'Annuler ',
                      reverseButtons: true
                    }).then((result) => {
                      if (result.isConfirmed) {
                        this.otherTeamService.delete(id)
                        .subscribe({
                          next: () => {
                            this.otherTeams = this.otherTeams.filter((otherTeam) => otherTeam.id !== id);

                          },
                          error:()=>() => { }
                        })
                        swalWithTailwindButtons.fire(
                          'Supprimé!',
                          'Le Other Team a été supprimé.',
                          'success'
                        )
                      }
                    }
                  );
  }
  addOtherTeam() {
    this.router.navigate(['/secured/dashboard/other'])
  }
  // Other methods and properties can be added here as needed


}
