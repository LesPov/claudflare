import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @Input() currentStep = 1;
  @Input() totalSteps = 2;
  @Input() denunciaSeleccionada = false;

  @Output() continuar = new EventEmitter<void>();

  continuarPaso() {
    if (this.denunciaSeleccionada) {
      this.continuar.emit();
    }
  }
}