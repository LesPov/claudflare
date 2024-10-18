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
  imports: [FormsModule, CommonModule, RouterLink, HeaderComponent],
  templateUrl: './anonima.component.html',
  styleUrl: './anonima.component.css'
})
export class AnonimaComponent implements OnInit {
  tiposDenunciasAnonimas: TipoDenunciaInterface[] = [];
  descripcionVisible: boolean[] = [];
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
        this.descripcionVisible = new Array(tipos.length).fill(false);
      },
      error: (err) => {
        this.errorMessage = 'Error al obtener las denuncias anónimas';
        console.error(err);
      }
    });
  }

  toggleDescripcion(index: number): void {
    this.descripcionVisible[index] = !this.descripcionVisible[index];
  }

  // Método para obtener la URL de la imagen
  getImageUrl(flagImage: string): string {
    // Asume que las imágenes se almacenan en una carpeta 'assets/images'
    // Ajusta esta ruta según la estructura de tu proyecto
    return `assets/img/demandas/tipo_demandas/${flagImage}`;
  }
}