import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showModal: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    // Mostrar el modal al cargar la página y configurarlo para que se cierre automáticamente
    setTimeout(() => {
      this.closeModal();
    }, 5000); // El modal se cerrará automáticamente después de 3 segundos
  }

  closeModal() {
    this.showModal = false;
  }
}
