// footer.component.ts
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @Input() currentStep: number | null = null;
  @Input() totalSteps: number | null = null;
  @Input() denunciaSeleccionada = false;
  @Input() showDots = false;  // Nueva propiedad para mostrar/ocultar los dots
  @Input() showStepCounter: boolean = false; // Nuevo input para controlar visibilidad

  @Output() continuar = new EventEmitter<void>();

  continuarPaso() {
    if (this.denunciaSeleccionada) {
      this.continuar.emit();
    }
  }
}
