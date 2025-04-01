import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamTypeDetail } from '../../../../core/models/team-type-detail';
import { ExpiredService } from '../../../../services/expired.service';
import { TeamTypeService } from '../../../../services/team-type.service';
import { AuthService } from '../../../../services/auth.service';
import { TeamType } from '../../../../core/models/team-type';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-team-type-list',
  templateUrl: './team-type-list.component.html',
  styleUrl: './team-type-list.component.css'
})
export class TeamTypeListComponent implements OnInit{

  teamtypes:TeamTypeDetail[]=[];
  teamtype!:TeamTypeDetail;
  id!:string;
  isAddMode!:boolean
  isExpired!:boolean;

  expiredService:ExpiredService=inject(ExpiredService);
  router:Router=inject(Router);
  activatedRoute:ActivatedRoute=inject(ActivatedRoute);
  teamTypeService:TeamTypeService=inject(TeamTypeService);
  authService:AuthService=inject(AuthService);


  addTeamType() {
    this.router.navigate(['/secured/dashboard/teamtype'])
  }
  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.isAddMode=!this.id;

    this.expiredService.updateState(this.authService.isExpired());
    this.expiredService.state$.subscribe(state=>this.isExpired=state);
    if(this.isExpired) this.authService.logout();

    this.teamTypeService.getAll()
    .subscribe({
      next:(data)=>{
        const tempData=data as unknown as TeamType;
        this.teamtypes=tempData["data"] as unknown as TeamTypeDetail[];
      }
    })
  }
  deleteTeamType(id: string) {
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
      text: "De vouloir supprimer ce Team Type !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler ',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.teamTypeService.delete(id)
        .subscribe({
          next: () => {
            this.teamtypes = this.teamtypes.filter((tmtype) => tmtype.id !== id);
          },
          error:()=>() => { }
        })
        swalWithTailwindButtons.fire(
          'Supprimé!',
          'Le TeamType a été supprimé.',
          'success'
        )
      }
    }
  )
}
  editTeamType(id: string) {
    this.router.navigate(['/secured/dashboard/teamtype/show',id]);
  }

}
