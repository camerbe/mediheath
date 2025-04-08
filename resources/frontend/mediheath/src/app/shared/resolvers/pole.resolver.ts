import { ResolveFn } from '@angular/router';

export const poleResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
