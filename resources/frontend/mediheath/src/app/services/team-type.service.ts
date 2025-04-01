import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { TeamType } from '../core/models/team-type';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TeamTypeService extends DataService<TeamType>{

  constructor(httpClient:HttpClient) {
    super(httpClient,environment.baseUrl+`/teamtypes`);
  }
}
