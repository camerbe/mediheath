import { Inject, Injectable } from '@angular/core';
import { DataService } from './data.service';
import { MedicalTeamDetail } from '../core/models/medical-team-detail';
import { MedicalTeam } from '../core/models/medical-team';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicalTeamService extends DataService<MedicalTeam> {

  constructor(@Inject(HttpClient) httpClient:HttpClient) {
        super(httpClient,environment.baseUrl+`/medicals`);
    }
    getLast():Observable<MedicalTeam>{
      return this.httpClient.get<MedicalTeam>(environment.baseUrl+`/medicals/last`)
    }
}
