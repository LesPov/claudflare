import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BotInfoService {
  private infoList: { [key: string]: string[] } = {
    anonima: [
      "Las denuncias anónimas permiten reportar situaciones sin revelar tu identidad.",
      "Selecciona el tipo de denuncia que mejor se ajuste a la situación que quieres reportar.",
      "Recuerda proporcionar todos los detalles posibles para que la denuncia sea efectiva.",
      "Aunque la denuncia es anónima, puedes hacer seguimiento usando un código que se te proporcionará.",
      "Si necesitas más información sobre algún tipo de denuncia, toca el ícono de información."
    ],
    subtipo: [
      "Ahora puedes especificar más detalles sobre tu denuncia.",
      "Selecciona el subtipo que mejor describa la situación que estás denunciando.",
      "Cada subtipo tiene características específicas que ayudarán a procesar tu denuncia de manera más eficiente.",
      "Si no encuentras un subtipo que se ajuste exactamente, elige el más cercano y proporciona detalles adicionales más adelante."
    ],
    // Puedes agregar más categorías según sea necesario
  };

  private currentComponentSubject = new BehaviorSubject<string>('');
  private infoIndexSubject = new BehaviorSubject<number>(0);

  constructor() {}

  setCurrentComponent(component: string): void {
    this.currentComponentSubject.next(component);
    this.infoIndexSubject.next(0); // Reinicia el índice cuando cambia el componente
  }

  getCurrentComponent(): Observable<string> {
    return this.currentComponentSubject.asObservable();
  }

  getNextInfo(): string {
    const currentComponent = this.currentComponentSubject.value;
    const currentIndex = this.infoIndexSubject.value;
    const componentInfo = this.infoList[currentComponent];

    if (!componentInfo || componentInfo.length === 0) {
      return "No hay información disponible para este componente.";
    }

    const info = componentInfo[currentIndex];
    const nextIndex = (currentIndex + 1) % componentInfo.length;
    this.infoIndexSubject.next(nextIndex);

    return info;
  }
  speak(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        utterance.pitch = 2; // Cambia el tono de la voz
        utterance.rate = 1; // Controla la velocidad de la voz
        
        // Elegir una voz más amigable
        const availableVoices = window.speechSynthesis.getVoices();
        const selectedVoice = availableVoices.find(voice => voice.name.includes('Google') || voice.name.includes('Microsoft')); // Cambia según tus necesidades
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
  
        utterance.onend = () => resolve();
        utterance.onerror = (event) => reject(event.error);
        
        window.speechSynthesis.speak(utterance);
      } else {
        reject('La síntesis de voz no está disponible en este navegador.');
      }
    });
  }
  

  cancelSpeak(): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}