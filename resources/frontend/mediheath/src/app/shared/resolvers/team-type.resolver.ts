import { ResolveFn } from '@angular/router';
import { TeamTypeService } from '../../services/team-type.service';
import { inject } from '@angular/core';
import { TeamType } from '../../core/models/team-type';

export const teamTypeResolver: ResolveFn<TeamType | null> = (route, state) => {
  const id= route.params["id"];
  if (!id) return null;
  return inject(TeamTypeService).show(id);
};
