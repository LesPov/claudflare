import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { adminRoutes } from './components/admin-panel/routes/admin.routes';
import { sharedRoutes } from './components/home/routes/shared-routes';
import { userRoutes } from './components/user/routes/user.routes';
import { anonimoRoutes } from './components/denuncias/routes/anonimo.routes';

export const routes: Routes = [
  ...anonimoRoutes, // Movemos las rutas anónimas al principio para darles prioridad
  ...adminRoutes,
  ...userRoutes,
  ...sharedRoutes,
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
