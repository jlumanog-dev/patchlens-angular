import { CanActivateFn, Router } from '@angular/router';
import { authenticationService } from '../../auth/auth.service';
import { inject } from '@angular/core';

export const guestGuard: CanActivateFn = (route, state) => {
  const auth = inject(authenticationService);
  const router = inject(Router);
  if(auth.isAuthenticated()){
    return router.createUrlTree(['..']);
  }
  return true;
};
