import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ubicacion',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './ubicacion.component.html',
  styleUrl: './ubicacion.component.css'
})

export class UbicacionComponent {
  currentStep = 2;  // Segundo paso
  totalSteps = 3;   // Definir el número total de pasos

  constructor(private router: Router) {}

  handleContinue(): void {
    // Navegar al siguiente paso, por ejemplo, a la dirección
    this.router.navigate(['/direccion']);
  }
}