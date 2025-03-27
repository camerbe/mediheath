import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ExpiredService } from '../../services/expired.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  isExpired:boolean=false;
  fullName!:string;
  authService:AuthService=inject(AuthService);
  expiredService:ExpiredService=inject(ExpiredService);

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  ngOnInit(): void {
    this.expiredService.updateState(this.authService.isExpired());
    this.expiredService.state$.subscribe({
      next: (data) => this.isExpired = data
    });
    if (this.isExpired) this.authService.logout()
      if(isPlatformBrowser(this.platformId)){
        this.fullName = localStorage.getItem('fullname') || '';
      }
    }

    logout() {
      this.authService.logout();
    }


}
