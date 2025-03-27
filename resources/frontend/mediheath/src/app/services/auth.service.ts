import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Credentials } from '../core/models/credentials';
import { Observable } from 'rxjs';
import { Jwt } from '../core/models/jwt';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl :string=environment.baseUrl;
  httpClient:HttpClient=inject(HttpClient);
  router:Router = inject(Router);
  /**
   *
   */
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}
  login(credentials:Credentials):Observable<Jwt>{
    return this.httpClient.post<Jwt>(this.baseUrl+`/auth/login`,credentials);
  }
  logout(){
    if(isPlatformBrowser(this.platformId)){
      localStorage.removeItem('expireAt');
      localStorage.removeItem('fullName');
      localStorage.clear();
    }
    this.router.navigate(['login'])
  }

  isExpired():boolean{

    if(isPlatformBrowser(this.platformId)){
      const dateNow=new Date().toLocaleString();
      const expire_At =  localStorage.getItem('expiredAt')|| '';
      return dateNow > expire_At
    }
    return true;

  }
}
