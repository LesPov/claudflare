import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { Router } from '@angular/router';
import { DenunciasService } from '../services/denuncias.service';
import { ConsultaDenunciaResponse } from '../interface/consultasDenunciasAnonimasInterface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';  // Asegúrate de tener ToastrService instalado

@Component({
  selector: 'app-anonima',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent],
  templateUrl: './anonima.component.html',
  styleUrls: ['./anonima.component.css']
})

export class AnonimaComponent implements OnInit {
  claveUnica: string = '';  // Variable para almacenar la clave ingresada
  consultaResultado: ConsultaDenunciaResponse | null = null;  // Variable para almacenar el resultado de la consulta
  error: string | null = null;

  constructor(private router: Router, private denunciasService: DenunciasService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  // Método para navegar a la ruta de Crear
  goToCrear() {
    this.router.navigate(['/tipos']);
  }

  // Método para consultar la denuncia anónima
  consultarDenuncia() {
    if (!this.claveUnica) {
      this.error = 'Por favor, ingresa una clave válida.';
      return;
    }

    this.denunciasService.consultarDenunciaAnonima(this.claveUnica).subscribe({
      next: (response) => {
        this.consultaResultado = response;
        this.error = null;  // Reinicia el mensaje de error si la consulta es exitosa

        // Mostrar toastr de éxito
        this.toastr.success('Consulta exitosa');
      },
      error: (err) => {
        this.error = 'No se encontró la denuncia o hubo un error en la consulta.';
        this.consultaResultado = null;

        // Mostrar toastr de error
        this.toastr.error('Error en la consulta', 'Denuncia no encontrada');
      }
    });
  }
}
