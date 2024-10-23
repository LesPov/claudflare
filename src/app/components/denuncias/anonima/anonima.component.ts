import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anonima',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './anonima.component.html',
  styleUrls: ['./anonima.component.css']
})
export class AnonimaComponent {
    constructor(private router: Router) { }
// Método para navegar a Crear
  // Método para navegar a la ruta de Crear
  goToCrear() {
    this.router.navigate(['/tipos']);
  }
}