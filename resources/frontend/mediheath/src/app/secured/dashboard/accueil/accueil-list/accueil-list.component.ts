
import { Component, inject, OnInit } from '@angular/core';
import { HomeDetail } from '../../../../core/models/home-detail';
import { ExpiredService } from '../../../../services/expired.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../../../../services/home.service';
import { AuthService } from '../../../../services/auth.service';
import { Home } from '../../../../core/models/home';
import Swal from 'sweetalert2';
import { get } from 'https';


@Component({
  selector: 'app-accueil-list',
  templateUrl: './accueil-list.component.html',
  styleUrl: './accueil-list.component.css'
})
export class AccueilListComponent implements OnInit {


  homes:HomeDetail[]=[];
  home!:HomeDetail;
  id!:string;
  isAddMode!:boolean
  isExpired!:boolean;
  image!:string;

  expiredService:ExpiredService=inject(ExpiredService);
  router:Router=inject(Router);
  activatedRoute:ActivatedRoute=inject(ActivatedRoute);
  homeService:HomeService=inject(HomeService);
  authService:AuthService=inject(AuthService);

  addHome() {
    this.router.navigate(['/secured/dashboard/accueil'])
  }
  editHome(id: string) {
    this.router.navigate(['/secured/dashboard/accueil/show',id])
  }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.isAddMode=!this.id;
    this.expiredService.updateState(this.authService.isExpired());
    this.expiredService.state$.subscribe(state=>this.isExpired=state);
    if(this.isExpired) this.authService.logout();
    this.homeService.getAll()
    .subscribe({
      next:(data)=>{
        const tempData=data as unknown as Home;
        this.homes=tempData["data"] as unknown as HomeDetail[];
      }
    })
  }

  deleteHome(id: string) {
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
          text: "De vouloir supprimer ce Home!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Supprimer',
          cancelButtonText: 'Annuler ',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.homeService.delete(id)
            .subscribe({
              next: () => {
                this.homes = this.homes.filter((home) => home.id !== id);

              },
              error:()=>() => { }
            })
            swalWithTailwindButtons.fire(
              'Supprimé!',
              'Le Home a été supprimé.',
              'success'
            )
          }
        }
      )
  }

}


