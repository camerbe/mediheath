import { ResolveFn } from '@angular/router';
import { Centre } from '../../core/models/centre';
import { CentreService } from '../../services/centre.service';
import { inject } from '@angular/core';

export const centreResolver: ResolveFn<Centre | null> = (route, state) => {
  const id= route.params["id"];
  if (!id) return null;
  return inject(CentreService).show(id);
};
