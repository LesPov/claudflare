import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BotInfoService } from '../../../home/bot/botInfoService';
import { TipoDenunciaInterface } from '../../interface/tipoDenunciaInterface';
import { DenunciasService } from '../../services/denuncias.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-tipos',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './tipos.component.html',
  styleUrl: './tipos.component.css'
})
export class TiposComponent implements OnInit {
  tiposDenunciasAnonimas: TipoDenunciaInterface[] = [];
  descripcionVisible: number | null = null;
  selectedDenunciaIndex: number | null = null;
  isSpeaking: boolean = false;
  speakingIndex: number | null = null;
  pulsingStates: boolean[] = [];
  denunciaSelected: boolean = false;  // Flag to track if a denuncia is selected
  tipoDenuncia: string | null = null;  // Guardar el tipo de denuncia

  private infoListAnonima: string[] = [
    "Las denuncias anónimas permiten reportar situaciones sin revelar tu identidad.",
    "Selecciona el tipo de denuncia que mejor se ajuste a la situación que quieres reportar.",
    "Recuerda proporcionar todos los detalles posibles para que la denuncia sea efectiva.",
    "Aunque la denuncia es anónima, puedes hacer seguimiento usando un código que se te proporcionará.",
    "Si necesitas más información sobre algún tipo de denuncia, toca el ícono de información."
  ];

  constructor(
    private denunciasService: DenunciasService,
    private router: Router,
    private toastr: ToastrService,
    private botInfoService: BotInfoService 
  ) {}

  ngOnInit(): void {
    this.obtenerTiposDenunciaAnonimas();
    this.botInfoService.setInfoList(this.infoListAnonima);
  }

  obtenerTiposDenunciaAnonimas(): void {
    this.denunciasService.getTiposDenunciaAnonimas().subscribe({
      next: (tipos) => {
        this.tiposDenunciasAnonimas = tipos;
        this.pulsingStates = new Array(tipos.length).fill(true);
      },
      error: (err) => {
        this.toastr.error('Error al obtener las denuncias anónimas', 'Error');
        console.error(err);
      }
    });
  }

  toggleDescripcion(index: number): void {
    this.descripcionVisible = this.descripcionVisible === index ? null : index;
    this.stopPulse(index);
  }

  selectDenuncia(index: number): void {
    this.selectedDenunciaIndex = this.selectedDenunciaIndex === index ? null : index;
    this.denunciaSelected = this.selectedDenunciaIndex !== null;  // Set the flag based on selection
    this.stopPulse(index);
  }

  speakDenuncia(index: number): void {
    if (this.isSpeaking && this.speakingIndex === index) {
      return;
    }

    const denuncia = this.tiposDenunciasAnonimas[index];
    if (denuncia) {
      const name = denuncia.nombre;
      const description = denuncia.descripcion || 'No hay descripción disponible';

      this.botInfoService.cancelSpeak();

      this.isSpeaking = true;
      this.speakingIndex = index;
      this.stopPulse(index);

      this.botInfoService.speak(name)
        .then(() => this.botInfoService.speak(description))
        .then(() => {
          this.isSpeaking = false;
          this.speakingIndex = null;
        })
        .catch((error) => {
          console.error('Error al hablar:', error);
          this.isSpeaking = false;
          this.speakingIndex = null;
        });
    }
  }

  getImageUrl(flagImage: string): string {
    return `assets/img/demandas/tipo_demandas/${flagImage}`;
  }

  handleContinue(): void {
    if (this.selectedDenunciaIndex === null) {
      this.toastr.error('Por favor, selecciona una denuncia para continuar.', 'Error');
      return;
    }
    
    // Obtener el nombre del tipo de denuncia seleccionado
    const selectedDenuncia = this.tiposDenunciasAnonimas[this.selectedDenunciaIndex];
    if (selectedDenuncia) {
      // Navegar a la ruta de subtipos y pasar el nombre como parámetro
      this.router.navigate(['/subtipos', { nombreTipoDenuncia: selectedDenuncia.nombre }]);
    
    }
  }
  

  stopPulse(index: number): void {
    this.pulsingStates[index] = false;
  }

  isPulsing(index: number): boolean {
    return this.pulsingStates[index];
  }
}