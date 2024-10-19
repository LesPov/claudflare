import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BotInfoService } from '../../home/bot/botInfoService';
import { Subscription } from 'rxjs';

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

  isSpeaking: boolean = false;
  private subscription: Subscription | undefined;

  constructor(
    private location: Location,
    private botInfoService: BotInfoService
  ) {}

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

  speak(): void {
    if (this.isSpeaking) {
      this.botInfoService.cancelSpeak();
      this.isSpeaking = false;
    } else {
      const nextInfo = this.botInfoService.getNextInfo();
      this.isSpeaking = true;
      this.botInfoService.speak(nextInfo)
        .then(() => {
          this.isSpeaking = false;
        })
        .catch((error) => {
          console.error('Error al hablar:', error);
          this.isSpeaking = false;
        });
    }
  }
}