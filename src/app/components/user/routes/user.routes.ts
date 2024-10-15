// admin-routes.ts
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const userRoutes: Routes = [
  { path: 'dashboardUser', loadComponent: () => import('../dashboarduser/dashboarduser.component').then(m => m.DashboarduserComponent) },
  { path: 'loginUser', loadComponent: () => import('../login-user/login-user.component').then(m => m.LoginUserComponent) },
  { path: 'registerUser', loadComponent: () => import('../register-user/register-user.component').then(m => m.RegisterUserComponent) },

];