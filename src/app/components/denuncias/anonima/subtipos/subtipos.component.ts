import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DenunciasService } from '../../services/denuncias.service';
import { FooterComponent } from '../footer/footer.component';
import { SubtipoDenunciaInterface } from '../../interface/subtipoDenunciaInterface';
import { BotInfoService } from '../../../home/bot/botInfoService';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-subtipos',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './subtipos.component.html',
  styleUrls: ['./subtipos.component.css']
})
export class SubtiposComponent implements OnInit {
  subtipos: SubtipoDenunciaInterface[] = [];
  tipoDenuncia: string | null = null;
  isSpeaking: boolean = false;
  speakingIndex: number | null = null;
  pulsingStates: boolean[] = [];
  descripcionVisible: number | null = null;
  selectedDenunciaIndex: number | null = null;

  private infosubtiposlist: string[] = [
    "Por favor, selecciona un subtipo de denuncia.",
    "Puedes hacer clic en la imagen para escuchar más información sobre el subtipo.",
    "Recuerda que tu denuncia es importante y se tomará en cuenta.",
    "Selecciona el subtipo adecuado para tu denuncia.",
    "Si tienes dudas, haz clic en el icono para obtener más información.",
    "Gracias por contribuir a la seguridad de tu comunidad."
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private denunciasService: DenunciasService,
    private toastr: ToastrService,
    private botInfoService: BotInfoService
  ) { }
  ngOnInit(): void {
    // Obtener el nombre del tipo de denuncia de los parámetros de la ruta
    this.route.params.subscribe(params => {
      this.tipoDenuncia = params['nombreTipoDenuncia'];
      this.obtenerSubtipos(this.tipoDenuncia);
    });
    this.botInfoService.setInfoList(this.infosubtiposlist);
  }

  obtenerSubtipos(nombreTipoDenuncia: string | null): void {
    if (nombreTipoDenuncia) {
      this.denunciasService.getSubtiposDenuncia(nombreTipoDenuncia).subscribe({
        next: (response) => {
          this.subtipos = response.subtipos;
          this.pulsingStates = new Array(this.subtipos.length).fill(true);
        },
        error: (err) => {
          this.toastr.error('Error al obtener los subtipos de denuncia', 'Error');
          console.error(err);
        }
      });
    }
  }


  toggleDescripcion(index: number): void {
    this.descripcionVisible = this.descripcionVisible === index ? null : index;
    this.stopPulse(index);
  }
  selectDenuncia(index: number): void {
    this.selectedDenunciaIndex = this.selectedDenunciaIndex === index ? null : index;
    this.stopPulse(index);
  }
  getImageUrl(flagImage: string): string {
    return `assets/img/demandas/subtipos_de_demandas/${flagImage}`;
  }


  speakDenuncia(index: number): void {
    if (this.isSpeaking && this.speakingIndex === index) {
      return;
    }

    const subtipo = this.subtipos[index];
    if (subtipo) {
      const name = subtipo.nombre;
      const description = subtipo.descripcion || 'No hay descripción disponible';

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

  handleContinue(): void {
    if (this.selectedDenunciaIndex === null) {
      this.toastr.error('Por favor, selecciona una denuncia para continuar.', 'Error');
      return;
    }

    // Obtener el nombre del tipo de denuncia seleccionado
    const selectedDenuncia = this.subtipos[this.selectedDenunciaIndex];
    if (selectedDenuncia) {
      // Navegar a la ruta de denuncias anonimas


    }
  }

  stopPulse(index: number): void {
    this.pulsingStates[index] = false;
  }

  isPulsing(index: number): boolean {
    return this.pulsingStates[index];
  }
}
