import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

declare var responsiveVoice: any;

@Injectable({
  providedIn: 'root'
})
export class BotInfoService {
  private currentInfoList: string[] = [];
  private currentComponentSubject = new BehaviorSubject<string>('anonima');
  private infoIndexSubject = new BehaviorSubject<number>(0);
  private isPaused = false;
  private isSpeaking = false;

  constructor() {
    if (responsiveVoice) {
      responsiveVoice.init();
    }
  }

  setCurrentComponent(component: string): void {
    this.currentComponentSubject.next(component);
    this.infoIndexSubject.next(0);
  }

  getCurrentComponent(): Observable<string> {
    return this.currentComponentSubject.asObservable();
  }

  setInfoList(infoList: string[]): void {
    this.currentInfoList = infoList;
    this.infoIndexSubject.next(0);
  }

  getNextInfo(): string {
    const currentIndex = this.infoIndexSubject.value;

    if (this.currentInfoList.length === 0) {
      return "No hay información disponible.";
    }

    const info = this.currentInfoList[currentIndex];
    const nextIndex = (currentIndex + 1) % this.currentInfoList.length;
    this.infoIndexSubject.next(nextIndex);

    return info;
  }

  speak(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (responsiveVoice) {
        this.cancelSpeak();
        this.isSpeaking = true;
        
        responsiveVoice.speak(text, "Spanish Latin American Female", {
          pitch: 1,
          rate: 1.15,
          onend: () => {
            this.isSpeaking = false;
            resolve();
          },
          onerror: (error: any) => {
            this.isSpeaking = false;
            reject(error);
          }
        });
      } else {
        reject('ResponsiveVoice no está disponible.');
      }
    });
  }

  pauseSpeak(): void {
    if (responsiveVoice && this.isSpeaking && !this.isPaused) {
      responsiveVoice.pause();
      this.isPaused = true;
    }
  }

  resumeSpeak(): void {
    if (responsiveVoice && this.isPaused) {
      responsiveVoice.resume();
      this.isPaused = false;
    }
  }

  cancelSpeak(): void {
    if (responsiveVoice) {
      responsiveVoice.cancel();
      this.isPaused = false;
      this.isSpeaking = false;
    }
  }

  isSpeakingNow(): boolean {
    return this.isSpeaking;
  }
}