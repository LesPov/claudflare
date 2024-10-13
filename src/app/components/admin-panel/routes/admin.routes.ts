// admin-routes.ts
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../utils/auth.guard';

export const adminRoutes: Routes = [
  { path: 'registro', loadComponent: () => import('../auth/register/register.component').then(m => m.RegisterComponent) },
  { path: 'verificacionEmail', loadComponent: () => import('../auth//verification/verify-email/verify-email.component').then(m => m.VerifyEmailComponent) },
  { path: 'envioDeCelular', loadComponent: () => import('../auth//verification/send-phone/send-phone.component').then(m => m.SendPhoneComponent) },
  { path: 'verificacionCelular', loadComponent: () => import('../auth//verification/verify-phone/verify-phone.component').then(m => m.VerifyPhoneComponent) },
  { path: 'login', loadComponent: () => import('../auth//login/login.component').then(m => m.LoginComponent) },
  { path: 'loginRecovery', loadComponent: () => import('../auth//login/password/request/request-password.component').then(m => m.RequestPasswordComponent) },
  { path: 'loginChange', loadComponent: () => import('../auth//login/password/change/change-password.component').then(m => m.ChangePasswordComponent) },
  { 
    path: 'dashboardAdmin', 
    loadComponent: () => import('../sessionAdmin/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
  }
];