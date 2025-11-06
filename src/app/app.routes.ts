import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Main } from './shared/components/main/main';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';
import { HeroInsightView } from './features/heroes/hero-insight-view/hero-insight-view';
import { TabComponent } from './features/tab-component/tab-component';
import { HeroDetail } from './features/heroes/hero-detail/hero-detail';

export const routes: Routes = [
  {path: 'login', component: Login, title: "Login Page", canActivate: [guestGuard]},
  {path: 'register', component: Register, title: "Register - Welcome",  canActivate: [guestGuard]},
  {
    path: '',
    component: Main,
    title: "PatchLens",
    canActivate: [authGuard],
    children:[
      {
        path: '',
        component: TabComponent
      },
      {
        path: 'hero/:id',
        component: HeroDetail,
      }
    ]

  }
];
