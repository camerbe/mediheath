import { ResolveFn } from '@angular/router';
import { MedicalTeam } from '../../core/models/medical-team';
import { MedicalTeamService } from '../../services/medical-team.service';
import { inject } from '@angular/core';

export const medicalTeamResolver: ResolveFn<MedicalTeam | null> = (route, state) => {
   const id= route.params["id"];
    if (!id) return null;
    return inject(MedicalTeamService).show(id);
};
