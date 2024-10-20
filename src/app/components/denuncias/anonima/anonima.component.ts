import { Component, OnInit } from '@angular/core';
import { TipoDenunciaInterface } from '../interface/tipoDenunciaInterface';
import { DenunciasService } from '../services/denuncias.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../user/header/header.component';
import { ToastrService } from 'ngx-toastr';
import { FooterComponent } from './footer/footer.component';
import { BotInfoService } from '../../home/bot/botInfoService';

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
  backgroundColor: string = '#ffffff';
  isSpeaking: boolean = false;
  speakingIndex: number | null = null;

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
    this.selectedDenunciaIndex = this.selectedDenunciaIndex === index ? null : index;
  }

  speakDenuncia(index: number): void {
    if (this.isSpeaking && this.speakingIndex === index) {
      // Si ya está hablando sobre esta denuncia, no hacemos nada
      return;
    }

    const denuncia = this.tiposDenunciasAnonimas[index];

    if (denuncia) {
      const name = denuncia.nombre;
      const description = denuncia.descripcion;

      // Cancelamos cualquier locución anterior
      this.botInfoService.cancelSpeak();

      this.isSpeaking = true;
      this.speakingIndex = index;

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
    this.router.navigate(['/subtipo']);
  }
}