import { Routes } from '@angular/router';

export const sharedRoutes: Routes = [
  { path: 'bienvenida', loadComponent: () => import('../../user/welcomen/welcomen.component').then(m => m.WelcomenComponent) },
  { path: 'home', loadComponent: () => import('../home.component').then(m => m.HomeComponent) },
  { path: '', redirectTo: '/bienvenida', pathMatch: 'full' },
  { path: '**', redirectTo: '/bienvenida' },
];
