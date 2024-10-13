// admin-routes.ts
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const userRoutes: Routes = [
  { path: 'dashboardUser', loadComponent: () => import('../dashboarduser/dashboarduser.component').then(m => m.DashboarduserComponent) },

];