import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BotInfoService } from '../../../home/bot/botInfoService';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() title: string = '';
  @Input() showSpeakButton: boolean = false;
  @Input() componentName: string = '';
  private darkTheme = 'dark-theme';
  @Input() tipoDenuncia: string | null = null;  // Nuevo input para el tipo de denuncia

  private iconTheme = 'uil-sun';
  isSpeaking: boolean = false;
  private subscription: Subscription | undefined;

  constructor(
    private location: Location,
    private botInfoService: BotInfoService
  ) { }

  ngOnInit() {
    this.botInfoService.setCurrentComponent(this.componentName);
    this.subscription = this.botInfoService.getCurrentComponent().subscribe(
      component => {
        console.log('Componente actual:', component);
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  goBack(): void {
    this.location.back();
  }
    // Función para mostrar título específico cuando el componente sea 'subtipos'
    getTitle(): string {
      return this.componentName === 'subtipos' && this.tipoDenuncia
        ? `Subtipos de ${this.tipoDenuncia}`  // Muestra el tipo de denuncia en el header
        : this.title;
    }
    speak(): void {
      const iconElement = document.querySelector('.bx-user-voice');
      
      if (this.isSpeaking) {
        // Si ya está hablando, cancelamos el habla
        this.botInfoService.cancelSpeak();
        this.isSpeaking = false;
        this.toggleSpeakingAnimation(false);
        iconElement?.classList.remove('speaking-active');  // Removemos la clase activa
        this.activatePulseAnimation();  // Activamos la animación de pulso
      } else {
        // Si no está hablando, obtenemos la siguiente información para hablar
        const nextInfo = this.botInfoService.getNextInfo();
        this.isSpeaking = true;
        this.toggleSpeakingAnimation(true);
        iconElement?.classList.add('speaking-active');  // Añadimos la clase activa
    
        this.botInfoService.speak(nextInfo)
          .then(() => {
            this.isSpeaking = false;
            this.toggleSpeakingAnimation(false);
            iconElement?.classList.remove('speaking-active');  // Removemos la clase activa
            this.activatePulseAnimation();  // Activamos la animación de pulso
          })
          .catch((error) => {
            console.error('Error al hablar:', error);
            this.isSpeaking = false;
            this.toggleSpeakingAnimation(false);
            iconElement?.classList.remove('speaking-active');
            this.activatePulseAnimation();  // Activamos la animación de pulso
          });
      }
    }
    
    activatePulseAnimation(): void {
      const element = document.querySelector('.cuadro');
      if (element) {
        element.classList.add('pulse-animation');  // Activamos la animación de pulso
      }
    }
    
    
    toggleSpeakingAnimation(isSpeaking: boolean): void {
      const element = document.querySelector('.cuadro');
      if (element) {
        if (isSpeaking) {
          element.classList.add('speaking');
        } else {
          element.classList.remove('speaking');
        }
      }
    }
    
  getHeaderClass(): string {
    return this.componentName === 'subtipos' ? 'header-subtipos' : '';
  }
  

  toggleTheme(): void {
    const currentTheme = this.getCurrentTheme();
    const currentIcon = this.getCurrentIcon();

    this.applyTheme(currentTheme === 'dark' ? 'light' : 'dark', currentIcon === 'uil-moon' ? 'uil-sun' : 'uil-moon');

    localStorage.setItem('selected-theme', currentTheme === 'dark' ? 'light' : 'dark');
    localStorage.setItem('selected-icon', currentIcon === 'uil-moon' ? 'uil-sun' : 'uil-moon');
  }

  private getCurrentTheme(): string {
    return document.body.classList.contains(this.darkTheme) ? 'dark' : 'light';
  }

  private getCurrentIcon(): string {
    const themeButton = document.getElementById('theme-button');
    return themeButton?.classList.contains(this.iconTheme) ? 'uil-moon' : 'uil-sun';
  }
  private applyTheme(theme: string, icon: string): void {
    document.body.classList[theme === 'dark' ? 'add' : 'remove'](this.darkTheme);
    this.getElementByIdAndApplyClass('theme-button', this.iconTheme, icon === 'uil-moon');
  }

  private getElementByIdAndApplyClass(id: string, className: string, shouldAdd: boolean): void {
    const element = document.getElementById(id);
    if (element) {
      element.classList[shouldAdd ? 'add' : 'remove'](className);
    }
  }
}