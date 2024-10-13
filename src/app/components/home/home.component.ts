import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink], // Importa módulos necesarios para los formularios y enlaces
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  showModal: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    // Modal se muestra por defecto cuando el componente se inicializa
  }

  closeModal() {
    this.showModal = false;
  }

}
