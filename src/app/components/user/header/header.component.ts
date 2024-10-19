import { Component, Input } from '@angular/core';
import { CommonModule, Location } from '@angular/common';  // Importa Location
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule ],  
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() title: string = '';
  @Input() showSpeakButton: boolean = false;  // Añadido para controlar el botón de hablar
  infoIndex: number = 0;
  infoList: string[] = [
    "La primera información es sobre las denuncias anónimas.",
    "La segunda información es sobre cómo presentar tu denuncia.",
    "La tercera información es sobre los derechos que tienes al denunciar."
  ];

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }

  speak(): void {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(this.infoList[this.infoIndex]);
      utterance.lang = 'es-ES';
      window.speechSynthesis.speak(utterance);
      this.infoIndex = (this.infoIndex + 1) % this.infoList.length;
    } else {
      console.error('La síntesis de voz no está disponible en este navegador.');
    }
  }
}