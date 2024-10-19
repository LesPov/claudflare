import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BotInfoService {
  /**
   * Almacena la lista de información categorizada asignada por el componente actual.
   * Se actualiza dinámicamente según el componente.
   */
  private currentInfoList: string[] = [];
  private currentComponentSubject = new BehaviorSubject<string>('anonima');

  /**
   * Subject que almacena el índice actual de la frase informativa que se está mostrando.
   */
  private infoIndexSubject = new BehaviorSubject<number>(0);
  
  /**
   * Estado que indica si la síntesis de voz está pausada.
   */
  private isPaused = false;
  
  /**
   * Almacena la instancia actual de SpeechSynthesisUtterance para controlar la reproducción de voz.
   */
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {}

  // Función para establecer el componente actual
  setCurrentComponent(component: string): void {
    this.currentComponentSubject.next(component);
    this.infoIndexSubject.next(0); // Reinicia el índice de información al cambiar de componente
  }

  // Función para obtener el componente actual como un Observable
  getCurrentComponent(): Observable<string> {
    return this.currentComponentSubject.asObservable();
  }

  /**
   * Configura la lista de frases informativas proporcionada por el componente.
   * @param infoList La lista de frases informativas.
   */
  setInfoList(infoList: string[]): void {
    this.currentInfoList = infoList;
    this.infoIndexSubject.next(0); // Reinicia el índice de información.
  }

  /**
   * Obtiene la siguiente frase informativa basada en el índice.
   * El índice avanza de manera circular dentro del array de frases.
   * @returns La siguiente frase informativa.
   */
  getNextInfo(): string {
    const currentIndex = this.infoIndexSubject.value;

    if (this.currentInfoList.length === 0) {
      return "No hay información disponible.";
    }

    const info = this.currentInfoList[currentIndex];
    const nextIndex = (currentIndex + 1) % this.currentInfoList.length; // Cicla entre las frases.
    this.infoIndexSubject.next(nextIndex);

    return info;
  }

  /**
   * Inicia la síntesis de voz para leer el texto proporcionado.
   * @param text El texto que será leído en voz alta.
   * @returns Una promesa que se resuelve cuando la síntesis de voz termina.
   */
  speak(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if ('speechSynthesis' in window) {
        this.cancelSpeak();  // Asegura que no haya superposición de voces.
        
        this.currentUtterance = new SpeechSynthesisUtterance(text);
        this.currentUtterance.lang = 'es-ES'; // Configura el idioma.
        this.currentUtterance.pitch = 1.1;    // Ajusta el tono de la voz.
        this.currentUtterance.rate = 1;       // Ajusta la velocidad de la voz.

        const availableVoices = window.speechSynthesis.getVoices();
        const selectedVoice = availableVoices.find(voice => voice.name.includes('Google') || voice.name.includes('Microsoft'));
        if (selectedVoice) {
          this.currentUtterance.voice = selectedVoice;
        }

        this.currentUtterance.onend = () => resolve();
        this.currentUtterance.onerror = (event) => reject(event.error);

        window.speechSynthesis.speak(this.currentUtterance);
      } else {
        reject('La síntesis de voz no está disponible en este navegador.');
      }
    });
  }

  pauseSpeak(): void {
    if ('speechSynthesis' in window && this.currentUtterance && !this.isPaused) {
      window.speechSynthesis.pause();
      this.isPaused = true;
    }
  }

  resumeSpeak(): void {
    if ('speechSynthesis' in window && this.isPaused) {
      window.speechSynthesis.resume();
      this.isPaused = false;
    }
  }

  cancelSpeak(): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.isPaused = false;
    }
  }
} 