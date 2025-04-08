import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Jwt } from '../../core/models/jwt';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { JwtService } from '../../services/jwt.service';
import { JwtPayload } from '../../core/models/jwt-payload';
import { isPlatformBrowser } from '@angular/common';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  erreur!: string;
  frmLogin!: FormGroup;
  token!:Jwt;

  authService:AuthService=inject(AuthService);
  fb:FormBuilder=inject(FormBuilder);
  jwtService:JwtService=inject(JwtService);
  router:Router=inject(Router);

  /**
   *
  */
 constructor(@Inject(PLATFORM_ID) private platformId: Object) {
   this.frmLogin=this.fb.group({
     email:[''],
     password:['']
    });
  }

  onSubmit() {
    //console.log(this.frmLogin.value);
    this.authService.login(this.frmLogin.value).subscribe({
      next: (data) => {
        this.token = data;
        const decodedToken:JwtPayload=this.jwtService.DecodeToken(this.token.token) as unknown  as  JwtPayload
        if (isPlatformBrowser(this.platformId))
        {
          localStorage.setItem('token',this.token.token);
          localStorage.setItem('expiredAt', decodedToken.expires_in);
          localStorage.setItem('fullname',decodedToken.fullName);
          //console.log(this.token);
          //this.router.navigate(['/secured/dashboard']);
          this.router.navigateByUrl('/secured/dashboard');
        }


      },
      error:(err)=>{
        //console.log(err)
        this.erreur=err.message.split(':')[3]
      }
    });
  }
}

