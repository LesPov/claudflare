import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BotInfoService } from '../../../home/bot/botInfoService';
import { DenunciasService } from '../../services/denuncias.service';

@Component({
  selector: 'app-evidencia',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './evidencia.component.html',
  styleUrls: ['./evidencia.component.css']
})
export class EvidenciaComponent implements OnInit {
  subtipoDenuncia: string | null = null;
  currentStep = 1;  // El paso actual
  totalSteps = 3;   // Definir el número total de pasos

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private denunciasService: DenunciasService,
    private toastr: ToastrService,
    private botInfoService: BotInfoService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.subtipoDenuncia = params['nombreSubTipoDenuncia'];
    });
  }

  handleContinue(): void {
   
    // Navegar al paso 2: Ubicación
    this.router.navigate(['/ubicacion']);
  }
}