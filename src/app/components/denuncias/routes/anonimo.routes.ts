import { Routes } from '@angular/router';

export const anonimoRoutes: Routes = [
  { 
    path: 'anonima', 
    loadComponent: () => import('../anonima/anonima.component').then(m => m.AnonimaComponent),
    // Asegúrate de que la ruta al componente sea correcta
  },
];