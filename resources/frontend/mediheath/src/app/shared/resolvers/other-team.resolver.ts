import { ResolveFn } from '@angular/router';
import { OtherTeam } from '../../core/models/other-team';
import { OtherTeamService } from '../../services/other-team.service';
import { inject } from '@angular/core';

export const otherTeamResolver: ResolveFn<OtherTeam | null> = (route, state) => {
  const id= route.params["id"];
  if (!id) return null;
  return inject(OtherTeamService).show(id);
};
