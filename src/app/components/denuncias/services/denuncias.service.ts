// src/app/services/denuncias.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { TipoDenunciaInterface } from '../interface/tipoDenunciaInterface';


@Injectable({
  providedIn: 'root' // Este servicio estará disponible en toda la aplicación
})
export class DenunciasService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/denuncias/';  // Ruta base para denuncias
  }

  // OBTENER LISTA DE TIPOS DE DENUNCIAS ANONIMAS O AMBAS
  getTiposDenunciaAnonimas(): Observable<TipoDenunciaInterface[]> {
    return this.http.get<TipoDenunciaInterface[]>(`${this.myAppUrl}${this.myApiUrl}tipos/anonimas`);
  }

  // NUEVO MÉTODO PARA OBTENER SUBTIPOS DE DENUNCIA
  getSubtiposDenuncia(nombreTipoDenuncia: string): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}tipos/subtiposdenuncia/${nombreTipoDenuncia}`);
  }
}