import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BotInfoService } from '../../../home/bot/botInfoService';
import { DenunciasService } from '../../services/denuncias.service';
import { DenunciaStorageService } from '../../services/denunciaStorage.service';

@Component({
  selector: 'app-evidencia',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './evidencia.component.html',
  styleUrls: ['./evidencia.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush 

})
export class EvidenciaComponent implements OnInit {
  subtipoDenuncia: string | null = null;
  currentStep = 1;
  totalSteps = 3;
  selectedMultimedia: File[] = [];
  descripcion: string = '';
  minimumWords: number = 10;
  wordCount: number = 0;
  showError: boolean = false;
  // Variables para la grabación de audio
  isRecording = false;
  mediaRecorder: MediaRecorder | null = null;
  audioChunks: Blob[] = [];
  audioUrl: string | null = null;
  maxRecordingTime = 60000; // 1 minuto en milisegundos
  recordingTimeout: any;
  audioBlob: Blob | null = null;
  currentStream: MediaStream | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private denunciaStorage: DenunciaStorageService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef  // Añade esto

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.subtipoDenuncia = params['nombreSubTipoDenuncia'];
    });
  }
  onDescripcionChange(event: Event) {
    const input = event.target as HTMLTextAreaElement;
    this.descripcion = input.value;

    // Count words by splitting on whitespace and filtering out empty strings
    const words = this.descripcion.trim().split(/\s+/).filter(word => word.length > 0);
    this.wordCount = words.length;

    // Show error if words are less than minimum and description is not empty
    this.showError = this.descripcion.trim().length > 0 && this.wordCount < this.minimumWords;
  }
  // Método para iniciar/detener la grabación
  async toggleRecording() {
    if (!this.isRecording) {
      if (this.audioUrl) {
        // Si ya hay un audio grabado, limpiamos todo para empezar una nueva grabación
        this.clearAudioRecording();
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.currentStream = stream;
        this.startRecording(stream);
      } catch (error) {
        this.toastr.error('No se pudo acceder al micrófono');
        console.error('Error accessing microphone:', error);
      }
    } else {
      await this.stopRecording();
    }
  }

  // Limpiar la grabación actual
  private clearAudioRecording() {
    if (this.audioUrl) {
      URL.revokeObjectURL(this.audioUrl);
    }
    this.audioUrl = null;
    this.audioBlob = null;
    this.audioChunks = [];
  }

  // Iniciar la grabación
  private startRecording(stream: MediaStream) {
    this.audioChunks = [];
    this.mediaRecorder = new MediaRecorder(stream);

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.audioChunks.push(event.data);
      }
    };

    this.mediaRecorder.start();
    this.isRecording = true;

    // Configurar el timeout para detener automáticamente después de 1 minuto
    this.recordingTimeout = setTimeout(() => {
      if (this.isRecording) {
        this.stopRecording();
        this.toastr.info('La grabación ha alcanzado el límite de 1 minuto');
      }
    }, this.maxRecordingTime);
  }

  // Detener la grabación
  private async stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.isRecording = false;
      clearTimeout(this.recordingTimeout);

      return new Promise<void>((resolve) => {
        this.mediaRecorder!.onstop = () => {
          this.audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
          this.audioUrl = URL.createObjectURL(this.audioBlob);

          // Detener y limpiar el stream
          if (this.currentStream) {
            this.currentStream.getTracks().forEach(track => track.stop());
            this.currentStream = null;
          }
          resolve();
        };

        this.mediaRecorder!.stop();
      });
    }
    return Promise.resolve();
  }

  // Resto de los métodos existentes...
  triggerFileUpload(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedMultimedia = Array.from(input.files);
  
      // Usar setTimeout para retrasar el cambio de URL
      setTimeout(() => {
        this.cdr.detectChanges();
      });
    }
  }
  
  
  isImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

  isVideo(file: File): boolean {
    return file.type.startsWith('video/');
  }

  getFileUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  // Método para continuar al siguiente paso (solo si la descripción no está vacía)
  handleContinue(): void {
    if (this.descripcion.trim().length === 0) {
      this.toastr.error('Debes ingresar una descripción para continuar');
      return;
    }
  
    if (this.wordCount < this.minimumWords) {
      this.toastr.error(`La descripción debe contener al menos ${this.minimumWords} palabras`);
      return;
    }
  
    const multimediaPaths: string[] = [];
  
    // Guardar los archivos multimedia seleccionados
    this.selectedMultimedia.forEach(file => {
      const uniqueFileName = `${Date.now()}-${file.name}`; // Genera un nombre único usando la marca de tiempo
      const filePath = `uploads/multimedia/${uniqueFileName}`; // Ruta donde se almacenará el archivo
      multimediaPaths.push(filePath);
      // Aquí debes incluir la lógica para subir el archivo al servidor
      // y moverlo a `uploads/multimedia/` o la ruta que desees
    });
  
    let audioPath: string | undefined;
    if (this.audioBlob) {
      const uniqueAudioName = `${Date.now()}-audio.wav`; // Nombre único para el archivo de audio
      audioPath = `uploads/audio/${uniqueAudioName}`;
      // Aquí deberías subir el blob de audio al servidor, guardándolo en `uploads/audio/`
    }
  
    // Guardar en el storage
    this.denunciaStorage.setDescripcionPruebas(
      this.descripcion,
      multimediaPaths.length > 0 ? multimediaPaths.join(',') : undefined,
      audioPath
    );
  
    this.router.navigate(['/ubicacion']);
  }
  // Limpieza de recursos cuando el componente se destruye
  ngOnDestroy() {
    this.clearAudioRecording();
    if (this.currentStream) {
      this.currentStream.getTracks().forEach(track => track.stop());
    }
  }
}