import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Home } from '../core/models/home';
import { Centre } from '../core/models/centre';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CentreService extends DataService<Centre>{

  constructor(httpClient:HttpClient) {
        super(httpClient,environment.baseUrl+`/centres`);
    }
    getLast():Observable<Centre>{
      return this.httpClient.get<Centre>(environment.baseUrl+`/centres/last`)
    }
}
