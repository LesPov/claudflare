import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BotInfoService } from '../../../home/bot/botInfoService';
import { DenunciasService } from '../../services/denuncias.service';

@Component({
  selector: 'app-evidencia',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './evidencia.component.html',
  styleUrls: ['./evidencia.component.css']
})

export class EvidenciaComponent implements OnInit {
  subtipoDenuncia: string | null = null;
  currentStep = 1;  // El paso actual
  totalSteps = 3;   // Número total de pasos
  selectedMultimedia: File[] = []; // Archivos multimedia seleccionados

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private denunciasService: DenunciasService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.subtipoDenuncia = params['nombreSubTipoDenuncia'];
    });
  }

  // Método para manejar el clic en el ícono de subida de archivos
  triggerFileUpload(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();  // Simula el clic para abrir el selector de archivos
  }

  // Método para manejar la selección de archivos multimedia
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedMultimedia = Array.from(input.files); // Convertir los archivos a un array
    }
  }

  // Método para verificar si el archivo es una imagen
  isImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

  // Método para verificar si el archivo es un video
  isVideo(file: File): boolean {
    return file.type.startsWith('video/');
  }

  // Obtener la URL para vista previa
  getFileUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  handleContinue(): void {
    this.router.navigate(['/ubicacion']);
  }
}