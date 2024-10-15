import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcomen',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './welcomen.component.html',
  styleUrl: './welcomen.component.css'
})
export class WelcomenComponent implements OnInit {
  showModal: boolean = true;  // El modal comienza visible

  constructor(private router: Router) {}

  ngOnInit() {
    // Automáticamente cerrar el modal después de 5 segundos y redirigir al home
    setTimeout(() => {
      this.closeModal();
    }, 3500);  // 5000 ms = 5 segundos
  }

  closeModal() {
    this.showModal = false;  // Cierra el modal
    localStorage.setItem('modalShown', 'true');  // Guarda en localStorage que el modal ya fue mostrado
    this.router.navigate(['/home']);  // Redirige al home
  }
}