import { Inject, Injectable } from '@angular/core';
import { DataService } from './data.service';
import { OtherTeam } from '../core/models/other-team';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtherTeamService extends DataService<OtherTeam> {

  constructor(@Inject(HttpClient) httpClient:HttpClient) {
    super(httpClient,environment.baseUrl+`/others`);
  }
  getLast():Observable<OtherTeam>{
    return this.httpClient.get<OtherTeam>(environment.baseUrl+`/others/last`)
  }
}
