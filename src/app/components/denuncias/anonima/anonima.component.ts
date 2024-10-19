import { Component, OnInit } from '@angular/core';
import { TipoDenunciaInterface } from '../interface/tipoDenunciaInterface';
import { DenunciasService } from '../services/denuncias.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../user/header/header.component';
import { ToastrService } from 'ngx-toastr';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-anonima',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './anonima.component.html',
  styleUrls: ['./anonima.component.css']
})
export class AnonimaComponent implements OnInit {
  tiposDenunciasAnonimas: TipoDenunciaInterface[] = [];
  descripcionVisible: number | null = null;
  selectedDenunciaIndex: number | null = null;
  backgroundColor: string = '#ffffff'; // Color de fondo inicial

  constructor(
    private denunciasService: DenunciasService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.obtenerTiposDenunciaAnonimas();
  }

  obtenerTiposDenunciaAnonimas(): void {
    this.denunciasService.getTiposDenunciaAnonimas().subscribe({
      next: (tipos) => {
        this.tiposDenunciasAnonimas = tipos;
      },
      error: (err) => {
        this.toastr.error('Error al obtener las denuncias anónimas', 'Error');
        console.error(err);
      }
    });
  }

 
  toggleDescripcion(index: number): void {
    this.descripcionVisible = this.descripcionVisible === index ? null : index;
  }

  selectDenuncia(index: number): void {
    this.selectedDenunciaIndex = index;
  }

  handleContinue(): void {
    if (this.selectedDenunciaIndex === null) {
      this.toastr.error('Por favor, selecciona una denuncia para continuar.', 'Error');
      return;
    }
    this.router.navigate(['/subtipo']);
  }

  getImageUrl(flagImage: string): string {
    return `assets/img/demandas/tipo_demandas/${flagImage}`;
  }
}
