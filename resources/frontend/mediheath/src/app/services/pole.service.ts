import { Inject, Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Pole } from '../core/models/pole';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PoleService extends DataService<Pole> {

  constructor(@Inject(HttpClient) httpClient:HttpClient) {
      super(httpClient,environment.baseUrl+`/poles`);
  }
  getLast():Observable<Pole>{
    return this.httpClient.get<Pole>(environment.baseUrl+`/poles/last`)
  }
}
