import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { WelcomenComponent } from './welcomen/welcomen.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, WelcomenComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentModal: string | null = null;
  modalTitle: string = '';
  callUrl: string = '';
  navigateRoute: string = '';

  constructor(private router: Router) { }

  openModal(title: string, callUrl: string, route: string): void {
    this.currentModal = title;
    this.modalTitle = title;
    this.callUrl = callUrl;
    this.navigateRoute = route;
  }

  closeModal(): void {
    this.currentModal = null;
  }

  makeCall(): void {
    window.location.href = this.callUrl;
  }

  navigateToRoute(): void {
    this.router.navigate([this.navigateRoute]);
  }
}