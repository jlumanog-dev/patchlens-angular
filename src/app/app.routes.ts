import { Routes } from '@angular/router';
import { Templatefragement } from './dummy/templatefragement/templatefragement';
import { Displayone } from './dummy/displayone/displayone';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Main } from './shared/components/main/main';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';

export const routes: Routes = [
  {path: 'login', component: Login, title: "Login Page", canActivate: [guestGuard]},
  {path: 'register', component: Register, title: "Register - Welcome",  canActivate: [guestGuard]},
  {path: '', component: Main, title: "See some patch insights", canActivate: [authGuard]}
];
