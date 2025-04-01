import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Home } from '../core/models/home';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends DataService<Home> {

  constructor(httpClient:HttpClient) {
      super(httpClient,environment.baseUrl+`/homes`);
  }
  getLast():Observable<Home>{
    return this.httpClient.get<Home>(environment.baseUrl+`/homes/last`)
  }
}
