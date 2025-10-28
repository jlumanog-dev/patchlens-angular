import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { authenticationService } from '../../auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(authenticationService);
  const router = inject(Router);
  if(!authService.isAuthenticated()){
    return router.createUrlTree(['/login']);
  }
  return true;

};
