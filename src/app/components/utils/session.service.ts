// src/app/utils/session.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private inactivityTimeout: any;
  private readonly INACTIVITY_TIME = 5 * 60 * 1000; // 5 minutos para inactividad
  private logoutTime: number | null = null;

  constructor(private router: Router) { 
    this.resetInactivityTimer();
    this.setupActivityListeners();
  }

  private setupActivityListeners() {
    document.addEventListener('mousemove', () => this.resetInactivityTimer());
    document.addEventListener('keypress', () => this.resetInactivityTimer());
  }

  public resetInactivityTimer() {
    clearTimeout(this.inactivityTimeout);

    // Configura el tiempo de desconexión en 5 minutos desde la última actividad
    this.logoutTime = Date.now() + this.INACTIVITY_TIME;

    // Iniciar temporizador para cerrar sesión
    this.inactivityTimeout = setTimeout(() => this.logoutUser(), this.INACTIVITY_TIME);
  }

  public getRemainingTime(): number {
    return this.logoutTime ? Math.max(0, this.logoutTime - Date.now()) : 0;
  }

  private logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }
}
