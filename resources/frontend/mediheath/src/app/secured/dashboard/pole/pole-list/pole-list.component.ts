import { Component, inject, OnInit } from '@angular/core';
import { ExpiredService } from '../../../../services/expired.service';
import { PoleDetail } from '../../../../core/models/pole-detail';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { PoleService } from '../../../../services/pole.service';
import { Pole } from '../../../../core/models/pole';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pole-list',
  templateUrl: './pole-list.component.html',
  styleUrl: './pole-list.component.css'
})
export class PoleListComponent implements OnInit {

  poles:PoleDetail[]=[];
  pole!:PoleDetail;
  id!:string;
  isAddMode!:boolean
  isExpired!:boolean;
  image!:string;

  expiredService:ExpiredService=inject(ExpiredService);
  router:Router=inject(Router);
  activatedRoute:ActivatedRoute=inject(ActivatedRoute);
  poleService:PoleService=inject(PoleService);
  authService:AuthService=inject(AuthService);
  constructor() { }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.isAddMode=!this.id;
    this.expiredService.updateState(this.authService.isExpired());
    this.expiredService.state$.subscribe(state=>this.isExpired=state);
    if(this.isExpired) this.authService.logout();
    this.poleService.getAll()
    .subscribe({
      next:(data)=>{
        const tempData=data as unknown as Pole;
        this.poles = (tempData as any).data as PoleDetail[];
      }
    })
  }

  addPole() {
    this.router.navigate(['/secured/dashboard/pole'])
  }
  editPole(id: string) {
    this.router.navigate(['/secured/dashboard/pole/show',id])
  }
  deletePole(id: string) {
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
                  text: "De vouloir supprimer ce pôle!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Supprimer',
                  cancelButtonText: 'Annuler ',
                  reverseButtons: true
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.poleService.delete(id)
                    .subscribe({
                      next: () => {
                        this.poles = this.poles.filter((pole) => pole.id !== id);

                      },
                      error:()=>() => { }
                    })
                    swalWithTailwindButtons.fire(
                      'Supprimé!',
                      'Le pôle a été supprimé.',
                      'success'
                    )
                  }
                }
              )
  }
}
