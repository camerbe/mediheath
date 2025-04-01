import { Component, inject, OnInit } from '@angular/core';
import { CentreDetail } from '../../../../core/models/centre-detail';
import { ExpiredService } from '../../../../services/expired.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CentreService } from '../../../../services/centre.service';
import { AuthService } from '../../../../services/auth.service';
import { Centre } from '../../../../core/models/centre';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-centre-list',
  templateUrl: './centre-list.component.html',
  styleUrl: './centre-list.component.css'
})
export class CentreListComponent implements OnInit {

  centres:CentreDetail[]=[];
  centre!:CentreDetail;
  id!:string;
  isAddMode!:boolean
  isExpired!:boolean;
  image!:string;

  expiredService:ExpiredService=inject(ExpiredService);
  router:Router=inject(Router);
  activatedRoute:ActivatedRoute=inject(ActivatedRoute);
  centreService:CentreService=inject(CentreService);
  authService:AuthService=inject(AuthService);



  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.isAddMode=!this.id;
    this.expiredService.updateState(this.authService.isExpired());
    this.expiredService.state$.subscribe(state=>this.isExpired=state);
    if(this.isExpired) this.authService.logout();
    this.centreService.getAll()
    .subscribe({
      next:(data)=>{
        const tempData=data as unknown as Centre;
        this.centres=tempData["data"] as unknown as CentreDetail[];
      }
    })
  }

  editCentre(id: any) {
    this.router.navigate(['/secured/dashboard/centre/show',id])
  }
  deleteCentre(id: string) {
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
              text: "De vouloir supprimer ce centre!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Supprimer',
              cancelButtonText: 'Annuler ',
              reverseButtons: true
            }).then((result) => {
              if (result.isConfirmed) {
                this.centreService.delete(id)
                .subscribe({
                  next: () => {
                    this.centres = this.centres.filter((centre) => centre.id !== id);

                  },
                  error:()=>() => { }
                })
                swalWithTailwindButtons.fire(
                  'Supprimé!',
                  'Le centre a été supprimé.',
                  'success'
                )
              }
            }
          )
  }
  addCentre() {
    this.router.navigate(['/secured/dashboard/centre'])
  }

}


