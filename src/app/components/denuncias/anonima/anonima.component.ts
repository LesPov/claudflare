import { Component, OnInit } from '@angular/core';
import { TipoDenunciaInterface } from '../interface/tipoDenunciaInterface';
import { DenunciasService } from '../services/denuncias.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../user/header/header.component';

@Component({
  selector: 'app-anonima',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink,HeaderComponent], // Importa módulos necesarios para los formularios y enlaces
  templateUrl: './anonima.component.html',
  styleUrl: './anonima.component.css'
})
export class AnonimaComponent implements OnInit {
  tiposDenunciasAnonimas: TipoDenunciaInterface[] = [];
  descripcionVisible: boolean[] = [];  // Estado de visibilidad de la descripción
  errorMessage: string = '';

  constructor(
    private denunciasService: DenunciasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerTiposDenunciaAnonimas();
  }

  obtenerTiposDenunciaAnonimas(): void {
    this.denunciasService.getTiposDenunciaAnonimas().subscribe({
      next: (tipos) => {
        this.tiposDenunciasAnonimas = tipos;
        // Inicializamos el arreglo de visibilidad de descripciones en 'false'
        this.descripcionVisible = new Array(tipos.length).fill(false);
      },
      error: (err) => {
        this.errorMessage = 'Error al obtener las denuncias anónimas';
        console.error(err);
      }
    });
  }

  // Función para alternar la visibilidad de la descripción
  toggleDescripcion(index: number): void {
    this.descripcionVisible[index] = !this.descripcionVisible[index];
  }
}
