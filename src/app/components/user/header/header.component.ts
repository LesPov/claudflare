import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';  // Importa Location

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() title: string = '';  // Recibe el título como Input

  constructor(private location: Location) {}  // Inyecta Location

  // Método para retroceder
  goBack(): void {
    this.location.back();
  }
}