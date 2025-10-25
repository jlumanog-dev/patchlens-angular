import { Routes } from '@angular/router';
import { Templatefragement } from './dummy/templatefragement/templatefragement';
import { Displayone } from './dummy/displayone/displayone';
import { Login } from './auth/login/login';

export const routes: Routes = [
  {path: 'login', component: Login},
  {path: 'templatefragment', component: Templatefragement},
  {path: 'displayone', component: Displayone},

];
