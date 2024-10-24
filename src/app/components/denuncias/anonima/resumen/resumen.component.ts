import { Component, OnInit } from '@angular/core'; 
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { DenunciasService } from '../../services/denuncias.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DenunciaAnonimaInterface } from '../../interface/denunciaAnonimaInterface';
import { DenunciaStorageService } from '../../services/denunciaStorage.service';

@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {
  currentStep = 3;
  totalSteps = 3;
  datosResumen: Partial<DenunciaAnonimaInterface> = {};
  claveUnica: string | null = null; // Nueva variable para la clave única
  showModal: boolean = false; // Controlar la visibilidad del modal

  constructor(
    private denunciaStorageService: DenunciaStorageService,
    private denunciasService: DenunciasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.datosResumen = this.denunciaStorageService.getDenuncia();
  }

  // Verificar si el botón "Continuar" debe estar habilitado
  isContinueButtonEnabled(): boolean {
    return !!(
      this.datosResumen.nombreTipo &&
      this.datosResumen.nombreSubtipo &&
      this.datosResumen.descripcion &&
      this.datosResumen.direccion
    );
  }

  // Manejar el clic en el botón "Continuar"
  handleContinue(): void {
    if (this.isContinueButtonEnabled()) {
      // Lógica para enviar la denuncia al backend
      this.denunciasService
        .crearDenunciaAnonima(this.datosResumen as DenunciaAnonimaInterface)
        .subscribe({
          next: (response) => {
            console.log('Denuncia creada:', response);
            this.claveUnica = response.nuevaDenuncia.claveUnica; // Capturar la clave única desde la respuesta
            this.showModal = true; // Mostrar el modal de éxito
          },
          error: (error) => {
            console.error('Error al crear la denuncia:', error);
          },
        });
    }
  }

  // Función para cerrar el modal y redirigir a la página de éxito
  closeModal(): void {
    this.showModal = false;
    this.denunciaStorageService.resetDenuncia(); // Limpiar los datos después de cerrar el modal
    this.router.navigate(['/exito']); // Redirigir a una página de éxito
  }
}