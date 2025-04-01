import { ResolveFn } from '@angular/router';
import { Home } from '../../core/models/home';
import { HomeService } from '../../services/home.service';
import { inject } from '@angular/core';

export const homeResolver: ResolveFn<Home | null> = (route, state) => {
  const id= route.params["id"];
  if (!id) return null;
  return inject(HomeService).show(id);
};
