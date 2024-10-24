import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { TipoDenunciaInterface } from '../interface/tipoDenunciaInterface';
import { DenunciaAnonimaInterface } from '../interface/denunciaAnonimaInterface';

@Injectable({
  providedIn: 'root'
})
export class DenunciasService {
  private baseUrl: string = `${environment.endpoint}api/denuncias/`;

  constructor(private http: HttpClient) {}

  // Obtener lista de tipos de denuncias anónimas o ambas
  getTiposDenunciaAnonimas(): Observable<TipoDenunciaInterface[]> {
    return this.http.get<TipoDenunciaInterface[]>(`${this.baseUrl}tipos/anonimas`);
  }

  // Obtener subtipos según el tipo de denuncia
  getSubtiposDenuncia(nombreTipoDenuncia: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}tipos/subtiposdenuncia/${nombreTipoDenuncia}`);
  }

 
  // Crear una denuncia anónima
  crearDenunciaAnonima(
    denuncia: DenunciaAnonimaInterface
  ): Observable<{ message: string; nuevaDenuncia: DenunciaAnonimaInterface }> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // Ajustamos la URL para que incluya "denuncias/" al final
    return this.http.post<{ message: string; nuevaDenuncia: DenunciaAnonimaInterface }>(
      `${this.baseUrl}denuncias/`,
      denuncia,
      { headers }
    );
  }
}