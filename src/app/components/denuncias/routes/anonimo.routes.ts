import { Routes } from '@angular/router';

export const anonimoRoutes: Routes = [
  {
    path: 'anonima',
    loadComponent: () => import('../anonima/anonima.component').then(m => m.AnonimaComponent),
    // Asegúrate de que la ruta al componente sea correcta
  },
  {
    path: 'tipos',
    loadComponent: () => import('../anonima/tipos/tipos.component').then(m => m.TiposComponent),
  },
  {
    path: 'subtipos',
    loadComponent: () => import('../anonima/subtipos/subtipos.component').then(m => m.SubtiposComponent),
  },
  {
    path: 'evidencia',
    loadComponent: () => import('../anonima/evidencia/evidencia.component').then(m => m.EvidenciaComponent),
  },
  {
    path: 'ubicacion',
    loadComponent: () => import('../anonima/ubicacion/ubicacion.component').then(m => m.UbicacionComponent),
  },
  {
    path: 'resume',
    loadComponent: () => import('../anonima/resumen/resumen.component').then(m => m.ResumenComponent),
  },
];