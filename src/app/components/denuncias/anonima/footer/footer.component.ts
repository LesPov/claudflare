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
  @Input() currentStep = 1;
  @Input() totalSteps = 3;
  @Input() denunciaSeleccionada = false;
  @Input() showDots = false;  // Nueva propiedad para mostrar/ocultar los dots

  @Output() continuar = new EventEmitter<void>();

  continuarPaso() {
    if (this.denunciaSeleccionada) {
      this.continuar.emit();
    }
  }
}
